import TransactionModel from "../../models/TransactionModel";

import Paystack from "../../libs/Paystack";
import { isDev } from "../../configs/env";

import { Obj } from "object-collection/exports";
import { Http } from "xpresser/types/http";

export = {
  async getOneTransaction(http: Http) {
    const { reference } = http.params;
    const transaction = TransactionModel.native()
      .aggregate([
        {
          $match: {
            reference: reference
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
          $lookup: {
            from: "users",
            localField: "ownerId",
            foreignField: "_id",
            as: "waveCreator"
          }
        },
        {
          $unwind: "$wave"
        },
        {
          $unwind: "$waveCreator"
        }
      ])
      .toArray();

    return transaction;
  },
  async getAllTransactions() {
    const transactions = await TransactionModel.find();
    return transactions;
  },

  async updateTransaction(http: Http) {
    const { reference, paymentData } = http.$body.all();
    const transaction = await TransactionModel.findOne({ reference });

    console.log(reference, paymentData);

    transaction?.set({
      amount: paymentData.amount,
      paymentMethod: paymentData.paymentMethod,
      status: "pending"
    });
    await transaction?.save();

    return transaction;
  },

  async paymentCallback(http: any, value: any) {
    const body = http.$body.all();

    if (!body.event || (body && body.event !== "charge.success"))
      throw "Error Validating Payment!";

    console.log(body);
    // Get Transaction id.
    const { reference } = body.data;
    const data: any = isDev ? body.data : await Paystack.find(reference);

    // Stop if not successful
    if (data.status !== "success") throw "Successful payments only!";

    const transaction = await TransactionModel.findOne({ reference });

    // Stop if no order with that id found.
    if (!transaction) throw `transaction  (${reference}) not found!`;

    // Stop if order has already been paid for.
    if (transaction.data.paid) return `transaction has already been paid for.`;

    await transaction.markAsPaid({
      paystack: Obj(data).pick(["reference", "status", "paid_at", "channel"])
    });

    return http.toApi(data);
  },

  async createTransaction(http: any) {
    const body = http.$body.all();

    delete Object.assign(body, { ["waveId"]: body["_id"] })["_id"];

    const transaction = TransactionModel.make(body);

    console.log(transaction);

    await transaction.save();

    return transaction;
  }
};
