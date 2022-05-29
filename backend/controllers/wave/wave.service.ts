import WaveModel from "../../models/WaveModel";

import { Http } from "xpresser/types/http";
import { $, slugifyTitle } from "../../exports";
import WaverModel from "../../models/WaverModel";

export = {
  async getAllWaves(http: Http) {
    const userId = http.state.get("authUser");
    const value = http.$body.all();

    const waves = await WaverModel.native()
      .aggregate([
        {
          $match: {
            userId
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
          $unwind: {
            path: "$wave",
            preserveNullAndEmptyArrays: true,
            includeArrayIndex: "waveIndex"
          }
        },

        {
          $project: {
            _id: 0,
            wave: 1
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

    $.events.emit("WaveEvents.createActivity", {
      activity: "created",
      ...newWave
    });

    $.events.emit("WaveEvents.createWaver", { ownerId, ...newWave });

    return newWave;
  }
};
