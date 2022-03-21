import { Controller, Http } from "xpresser/types/http";
import { skipIfNotDefined } from "abolish/src/Functions";
import Wave from "../models/Wave";

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

    const newWave = await Wave.make(body);

    await newWave.save();

    return http.json({
      message: "Wave Created",
      wave: newWave
    });
  }
};
