/**
 * WaveEvents
 */
import LinkModel from "../models/LinkModel";
import PaystackModel from "../models/PaystackModel";
import { $ } from "../exports";
import WaveModel from "../models/WaveModel";
import TransactionModel from "../models/TransactionModel";

export = {
  namespace: "WaveEvents",

  /**
   * The `index` method is called by default.
   * it also inherits namespace as name.
   */

  async createLink(wave: any) {
    // console.log("wave link Created !!!", wave.data);
    const newLink = LinkModel.make({
      waveId: wave.id(),
      shortUrl: $.helpers.randomStr(6),
      url: `https://www.fyrewave/view-wave/${wave.data.slug}`
    });
    await newLink.save();

    console.log("newLink", newLink);

    // Your Code
  },

  async createPaystack(paystackData: any) {
    const newPaystack = PaystackModel.make(paystackData);
    await newPaystack.save();

    // Your Code
  },

  async updateWaveTargetAmount(waveData: any) {
    const transaction = await TransactionModel.findOne({
      uuid: waveData.transactionUuid
    });

    if (!transaction) throw "Transaction not found";

    const wave = await WaveModel.findOne({
      _id: transaction.data.waveId
    });

    if (!wave) throw "Wave not found";

    const newTargetAmount = wave.data.balance - transaction.data.amount;

    wave?.set({
      balance: newTargetAmount
    });

    await wave?.save();
    console.log("update target amount", newTargetAmount, wave);

    // Your Code
  },
  createActivity(waveData: any) {
    console.log("wave activity Created !!!", waveData);
  }
};
