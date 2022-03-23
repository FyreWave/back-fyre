import { Controller, Http } from "xpresser/types/http";
import { skipIfNotDefined } from "abolish/src/Functions";
import WaveModel from "../models/WaveModel";
import UserModel from "../models/UserModel";
import { slugifyTitle } from "../exports";

/**
 * WaveController
 */
export = <Controller.Object>{
  // Controller Name
  name: "WaveController",

  // Controller Default Error Handler.
  e: (http: Http, error: string) => http.status(401).json({ error }),

  middlewares: {
    Abolish: "*"
  },

  /**
   * Example Action.
   * @param http - Current Http Instance
   */
  async makeWave(http: Http) {
    type body = {
      waveName: string;
      waveDescription: string;
      dueDate: string;
      targetAmount: number;
    };
    const body = http.validatedBody<body>();

    const ownerId = http.state.get("authUser");

    console.log(ownerId, "??");

    const newWave = await WaveModel.make({
      slug: slugifyTitle(body.waveName),
      ownerId,
      ...body
    });
    // console.log(newWave);

    await newWave.save();

    return http.json({
      message: "WaveModel Created",
      wave: newWave
    });
  },

  async allWaves(http: Http) {
    const ownerId = http.state.get("authUser");
    const waves = await WaveModel.find({ ownerId });
    return http.send({
      waves
    });
  },

  async getWave(http: Http) {
    const waveId = http.params.waveId;
    console.log(waveId, "params");
    const wave = await WaveModel.findOne({ slug: waveId });
    return http.send({
      wave
    });
  }
};
