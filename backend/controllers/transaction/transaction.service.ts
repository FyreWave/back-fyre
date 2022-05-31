import TransactionModel from "../../models/TransactionModel";

import Paystack from "../../libs/Paystack";
import { isDev } from "../../configs/env";

import { Obj } from "object-collection/exports";
import { Http } from "xpresser/types/http";
import { $ } from "../../exports";

export = {
  async resetTransaction(http: Http) {
    const { uuid } = http.$body.all();

    const transaction = await TransactionModel.findOne({ uuid });

    if (!transaction) throw "Transaction not found";

    transaction?.set({
      status: "pending",
      paid: false
    });
    await transaction?.save();
  },

  async getTx(value: any) {
    //get on transaction
    console.log("get on transaction", value);

    const transaction = await TransactionModel.findOne({
      uuid: value.uuid
    });

    return transaction;
  },

  async getOneTransaction(http: Http) {
    const { uuid } = http.params;
    const transaction = TransactionModel.native()
      .aggregate([
        {
          $match: {
            uuid: uuid
          }
        },
        {
          $lookup: {
            from: "waves",
            localField: "waveId",
            foreignField: "_id",
            as: "wave"
          }
        },
        {
          $unwind: "$wave"
        }
      ])
      .toArray();

    return transaction;
  },
  async getAllDeposits(http: Http) {
    const ownerId = http.state.get("authUser");

    console.log(ownerId);

    const value = http.$body.all();

    const transactions = await TransactionModel.native()
      .aggregate([
        {
          $match: {
            ownerId
          }
        },
        {
          $lookup: {
            from: "waves",
            localField: "waveId",
            foreignField: "_id",
            as: "wave"
          }
        },
        {
          $unwind: "$wave"
        },

        /*  {
          $unset: [
            "wave._id",
            "wave.ownerId",
            "wave.createdAt",
            "wave.updatedAt",
            "wave.dueDate",
            "wave.waveType",
            "wave.waveDescription"
          ]
        },*/
        /*    {
          $project: {
            _id: 0,
            reference: 1,
            paid: 1,
            status: 1,
            amount: 1,
            createdAt: 1,
            wave: 1,
            "paystack.id": 1,
            "paystack.amount": 1,
            "paystack.paid_at": 1,
            "paystack.authorization": 1

            // wave: 1
          }
        }, */
        /* 
        {
          $unset: [
            "wave._id",
            "wave.ownerId",
            "wave.createdAt",
            "wave.updatedAt",
            "wave.dueDate",
            "wave.waveType",
            "wave.waveDescription"
          ]
        }, */

        {
          $sort: {
            createdAt: -1
          }
        },

        {
          $limit: value.limit
        }
      ])
      .toArray();
    return transactions;
  },

  async updateTransaction(http: Http) {
    const { uuid, paymentData } = http.$body.all();

    const transaction = await TransactionModel.findOne({ uuid });

    if (!transaction) throw "Transaction not found";

    transaction?.set({
      amount: paymentData.amount,
      paymentMethod: paymentData.paymentMethod,
      status: "pending"
    });
    await transaction?.save();

    // update wave balance

    // $.events.emit("WaveEvents.createPaystack", transaction);

    return transaction;
  },

  async paymentCallback(http: any, body: any) {
    if (!body.event || (body && body.event !== "charge.success"))
      throw "Error Validating Payment!";

    // Get Transaction id.
    const { reference } = body.data;
    const data: any = await Paystack.find(reference);
    // const data: any = isDev ? body.data : await Paystack.find(reference);

    // console.log(data, "data value ??");

    // Stop if not successful
    if (data.status !== "success") throw "Successful payments only!";

    const transactionUuid = Paystack.getTransactionUuid(reference);

    const transaction = await TransactionModel.findOne({ uuid: transactionUuid });

    // Stop if no order with that id found.
    if (!transaction) throw `transaction  (${reference}) not found!`;

    // Stop if order has already been paid for.
    if (transaction.data.paid) return `transaction has already been paid for.`;

    await transaction.markAsPaid({
      // paystack: data
      paystack: Obj(data).pick([
        "reference",
        "status",
        "paid_at",
        "channel",
        "authorization.last4",
        "authorization.bank",
        "authorization.brand",
        "authorization.channel",
        "authorization.card_type"
      ])
    });

    // update wave balance

    $.events.emit("WaveEvents.createPaystack", { transactionUuid, ...data });
    $.events.emit("WaveEvents.updateWaveTargetAmount", { transactionUuid, ...data });

    return data;
  },

  async createTransaction(http: Http, value: any) {
    const transaction = TransactionModel.make({
      waveId: value._id,
      userId: http.state.get("authUser")
    });

    await transaction.save();

    return transaction;
  },

  async addReferenceId(http: Http, body: any) {
    // const transaction = await this.getTx(body);

    const transaction = await TransactionModel.findOne({
      uuid: body.uuid
    });

    if (transaction?.has("paystack")) {
      throw `Transaction has a Paystack Reference ID.`;
    }

    // const { reference } = http.validatedBody<{ reference: string }>();

    await transaction?.update({ paystack: { reference: body.reference } });

    return transaction;
  }
};
