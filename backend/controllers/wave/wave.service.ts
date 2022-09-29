import WaveModel from "../../models/WaveModel";

import { Http } from "xpresser/types/http";
import { $, slugifyTitle } from "../../exports";
import WaverModel from "../../models/WaverModel";
import TransactionModel from "../../models/TransactionModel";
import ActivityModel from "../../models/ActivityModel";

export = {
  async getDashboardSummary(http: Http) {
    const userId = http.state.get("authUser");
    const value = http.$body.all();

    console.log("getDashboardSummary", value, userId);

    const totalDeposit = await TransactionModel.native()
      .aggregate([
        {
          $group: {
            _id: "$userId",
            total: { $sum: "$amount" }
          }
        },
        {
          $unwind: "$total"
        },
        {
          $match: {
            _id: userId
          }
        }
      ])
      .toArray();

    const transactions = await TransactionModel.native()
      .aggregate([
        {
          $match: {
            userId: userId,
            paid: true
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

    const waves = await WaveModel.native()
      .aggregate([
        {
          $match: {
            ownerId: userId
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

    return { waves, transactions, totalDeposit: totalDeposit[0] };
  },

  async getWaveSummary(http: Http) {
    const { data } = http.loadedParam("wave");

    const userId = http.state.get("authUser");

    // console.log("userId", userId, data);

    const activities = await ActivityModel.native()
      .aggregate([
        {
          $match: {
            waveId: data._id
          }
        },
        {
          $lookup: {
            from: "users",
            localField: "userId",
            foreignField: "_id",

            as: "user",
            pipeline: [
              {
                $project: {
                  password: 0,
                  role: 0
                }
              }
            ]
          }
        },
        {
          $unwind: {
            path: "$user",
            preserveNullAndEmptyArrays: true
          }
        }
      ])
      .toArray();

    const wave = await WaveModel.native()
      .aggregate([
        {
          $match: {
            _id: data._id
          }
        },
        {
          $lookup: {
            from: "users",
            localField: "ownerId",
            foreignField: "_id",
            as: "createdBy"
          }
        },
        {
          $unwind: {
            path: "$createdBy",
            preserveNullAndEmptyArrays: true,
            includeArrayIndex: "createdByIndex"
          }
        },
        {
          $project: {
            "createdBy.password": 0,
            "createdBy.role": 0
          }
        }
      ])
      .toArray();

    /* const waveMembers = await WaverModel.native()
      .aggregate([
        {
          $match: {
            waveId: data._id
          }
        },
        {
          $lookup: {
            from: "transaction",
            localField: "userId",
            foreignField: "userId",
            as: "transaction"
          }
        },
        {
          $unwind: {
            path: "$transaction",
            preserveNullAndEmptyArrays: true,
            includeArrayIndex: "transactionIndex"
          }
        },

        {
          $lookup: {
            from: "users",
            localField: "userId",
            foreignField: "_id",
            as: "user"
          }
        },
        {
          $unwind: {
            path: "$user",
            preserveNullAndEmptyArrays: true,
            includeArrayIndex: "arrayIndex"
          }
        }
        /*   {
          $project: {
            _id: 0,
            "user.username": 1,
            "user.firstName": 1,
            "user.lastName": 1,
            "user.email": 1,
            "transaction.amount": 1
          }
        } 
      ])
      .toArray(); */

    const waveMembers = await WaverModel.native()
      .aggregate([
        {
          $match: {
            waveId: data._id,
            userId
          }
        }
      ])
      .toArray();

    console.log("waveMembers", waveMembers);

    // const link = await LinkModel.findOne({ waveId: wave?.id() });
    return {
      wave: {
        ...wave[0],
        link: "view-wave/buy-land-or-justice-foundationn-fibui9",
        balance_percentage: 40
      },
      activities,
      wavers: waveMembers
    };
  },

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
    // console.log("total Deposit", totalDeposit);

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
