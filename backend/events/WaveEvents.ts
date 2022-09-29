/**
 * WaveEvents
 */
import LinkModel from "../models/LinkModel";
import PaystackModel from "../models/PaystackModel";
import { $ } from "../exports";
import WaveModel from "../models/WaveModel";
import TransactionModel from "../models/TransactionModel";
import WaverModel from "../models/WaverModel";
import ActivityModel from "../models/ActivityModel";

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

    const newTargetAmount = Number(wave.data.balance) - transaction.data.amount;

    wave?.set({
      balance: newTargetAmount
    });

    // console.log("update target amount", transaction, wave);
    // console.log("Wave data", waveData);

    const waver = await WaverModel.findOne({
      userId: transaction.data.userId
    });

    if (!waver) throw "Waver not found";

    waver?.set({
      amount: waver.data.amount + transaction.data.amount,
      targetAmount: waveData.data.targetAmount
    });
    console.log("show waver", waver);

    await waver?.save();

    await wave?.save();

    // Your Code
  },

  async waveCreated(waveData: any) {
    const activity = ActivityModel.make({
      from: waveData.data.ownerId,
      waveId: waveData.data._id,
      userId: waveData.data.ownerId,
      action: waveData.created
    });

    // console.log("wave activity Created !!!", activity);
    await activity.save();
  },
  async waveDeposit(waveData: any) {
    const activity = ActivityModel.make({
      from: waveData.data.ownerId,
      waveId: waveData.data._id,
      userId: waveData.data.ownerId,
      action: waveData.created,
      amount: waveData.data.amount
    });

    console.log("wave activity Created !!!", activity);
    await activity.save();
  },
  async depositActivity(waveData: any) {
    const activity = ActivityModel.make({
      from: waveData.data.ownerId,
      waveId: waveData.data._id,
      userId: waveData.data.ownerId,
      action: waveData.created
    });

    // console.log("wave activity Created !!!", activity);
    await activity.save();
  },

  async createWaver(waveData: any) {
    const waver = WaverModel.make({
      waveId: waveData.data._id,
      userId: waveData.data.ownerId,
      amount: 0
    });

    // console.log("waver Added", waver);

    await waver.save();
  }
};
