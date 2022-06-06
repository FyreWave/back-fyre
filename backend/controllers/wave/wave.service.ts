import WaveModel from "../../models/WaveModel";

import { Http } from "xpresser/types/http";
import { $, slugifyTitle } from "../../exports";
import WaverModel from "../../models/WaverModel";
import TransactionModel from "../../models/TransactionModel";

export = {
  async getAllWaves(http: Http) {
    const ownerId = http.state.get("authUser");
    const value = http.$body.all();

    console.log("getAllWaves", value, ownerId);

    const totalDeposit = await TransactionModel.native()
      .aggregate([
        {
          $group: {
            _id: ownerId,
            total: { $sum: "$amount" }
          }
        }
      ])
      .toArray();
    console.log("total Deposit", totalDeposit);

    const waves = await WaveModel.native()
      .aggregate([
        {
          $match: {
            ownerId
          }
        },

        {
          $limit: value.limit
        },
        {
          $sort: {
            createdAt: -1
          }
        }
      ])
      .toArray();

    return waves;
  },

  async makeWave(http: Http, value: any) {
    const ownerId = http.state.get("authUser");
    const newWave = WaveModel.make({
      slug: slugifyTitle(value.waveName),
      balance: value.targetAmount,
      ownerId,
      ...value
    });

    await newWave.save();

    $.events.emit("WaveEvents.waveCreated", {
      created: "created a waves",
      ...newWave
    });

    $.events.emit("WaveEvents.createWaver", { ownerId, ...newWave });

    return newWave;
  }
};
