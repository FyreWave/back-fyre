import { Controller, Http } from "xpresser/types/http";

import waveService from "./wave.service";
import WaveModel from "../../models/WaveModel";
import LinkModel from "../../models/LinkModel";
import waveValidator from "./wave.validators";

/**
 * WaveController
 */
export = <Controller.Object>{
  // Controller Name
  name: "wave.controller",

  // Controller Default Error Handler.
  e: (http: Http, error: string) => http.status(401).json({ error }),

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

  async getWave(http: Http) {
    const waveId = http.params.waveId;

    const wave = await WaveModel.findOne({ slug: waveId });
    const link = await LinkModel.findOne({ waveId: wave?.id() });
    return http.send({
      wave,
      link
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
