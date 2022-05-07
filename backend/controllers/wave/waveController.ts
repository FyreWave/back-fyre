import { Controller, Http } from "xpresser/types/http";

import waveService from "./wave.service";
import WaveModel from "../../models/WaveModel";
import LinkModel from "../../models/LinkModel";
import { $, slugifyTitle } from "../../exports";
// import waveValidator from "./wave.validators";

/**
 * WaveController
 */
export = <Controller.Object>{
  // Controller Name
  name: "wave.controller",

  // Controller Default Error Handler.
  e: (http: Http, error: string) => http.status(401).json({ error }),

  async getAllWave(http: Http) {
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

  async getWave(http: Http) {
    const waveId = http.params.waveId;
    console.log(waveId, "params");
    const wave = await WaveModel.findOne({ slug: waveId });
    const link = await LinkModel.findOne({ waveId: wave?.id() });
    return http.send({
      wave,
      link
    });
  },

  async makeWave(http: Http) {
    type body = {
      waveName: string;
      waveDescription: string;
      dueDate: string;
      targetAmount: number;
    };
    const body = http.$body.all();

    const ownerId = http.state.get("authUser");

    const newWave = WaveModel.make({
      slug: slugifyTitle(body.waveName),
      ownerId,
      ...body
    });
    // console.log(newWave);

    await newWave.save();

    $.events.emit("WaveEvents.createActivity", newWave);

    return http.json({
      message: "WaveModel Created",
      wave: newWave
    });
  }
};
