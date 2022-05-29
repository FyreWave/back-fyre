import { Controller, Http } from "xpresser/types/http";

import waveService from "./wave.service";
import WaveModel from "../../models/WaveModel";
import LinkModel from "../../models/LinkModel";
import waveValidator from "./wave.validators";
import UserModel from "../../models/UserModel";
import Waver from "../../models/WaverModel";
import WaverModel from "../../models/WaverModel";

/**
 * WaveController
 */

export = <Controller.Object>{
  // Controller Name
  name: "wave.controller",

  middlewares: {
    "Params.waveId": ["getWave", "joinWave", "getWaveSummary"]
  },
  // Controller Default Error Handler.
  e: (http: Http, error: string) => http.status(401).json({ error }),

  async joinWave(http: Http) {
    const shortId = http.params.shortId;

    const { data } = http.loadedParam("wave");

    const userId = http.state.get("authUser");

    const user = await UserModel.findOne({ _id: userId });

    if (!user) {
      return http.status(400).send({ message: "User not found" });
    }

    const waver = await Waver.findOne({ uuid: data.waverId });

    if (waver) {
      return http.status(404).json({ error: "You are a member of this wave" });
    }

    const newWaver = WaverModel.make({
      waveId: data._id,
      userId: userId
    });

    await newWaver.save();

    return {
      user,
      data,
      newWaver
    };
  },

  async getAllWaves(http: Http) {
    try {
      const result = await waveService.getAllWaves(http);
      return http.send({
        result
      });
    } catch (error) {
      return http.status(400).send({
        message: "no wave found",
        error
      });
    }
  },

  async getWaveSummary(http: Http) {
    const { data } = http.loadedParam("wave");

    const userId = http.state.get("authUser");

    const wave = await WaveModel.native()
      .aggregate([
        {
          $match: {
            _id: data._id
          }
        }
      ])
      .toArray();

    const waveUsers = await WaverModel.native()
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
            pipeline: [
              {
                $project: {
                  _id: 0,
                  password: 0
                }
              }
            ],
            as: "user"
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

    // const link = await LinkModel.findOne({ waveId: wave?.id() });
    return http.send({
      wave: {
        ...wave[0],
        link: "view-wave/buy-land-or-justice-foundationn-fibui9",
        balance_percentage: 40
      },
      activities: [
        {
          name: "e-money",
          amount: "345,000",
          type: "deposited",
          date: "25-12-2022"
        },
        {
          name: "Nelson fundzbag",
          amount: "",
          type: "initiated a withdrawal",
          date: "25-12-2022"
        },
        {
          name: "Williams Uchendu",
          type: "deposited",
          amount: "23,000",
          date: "25-12-2022"
        },
        {
          name: "Sam Nmeje",
          type: "invited",
          invitee: "sandra",
          date: "25-334-2023"
        }
      ],
      wavers: waveUsers
    });
  },

  async getWave(http: Http) {
    const { data } = http.loadedParam("wave");

    console.log(data);

    const wave = await WaveModel.native()
      .aggregate([
        {
          $match: {
            _id: data._id
          }
        }
      ])
      .toArray();

    // const link = await LinkModel.findOne({ waveId: wave?.id() });
    return http.send({
      wave: {
        ...wave[0],
        link: "view-wave/buy-land-or-justice-foundationn-fibui9",
        balance_percentage: 40
      }
    });
  },

  async makeWave(http: Http) {
    try {
      const body = http.$body.all();
      const { value, error } = waveValidator.makeWavesValidator(body);

      const result = await waveService.makeWave(http, value);

      return http.send({
        message: "New wave created"
      });
    } catch (error) {
      return http.status(400).send({
        error
      });
    }
  }
};
