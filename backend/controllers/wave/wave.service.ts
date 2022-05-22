import WaveModel from "../../models/WaveModel";

import { Http } from "xpresser/types/http";
import { $, slugifyTitle } from "../../exports";

export = {
  async getAllWaves(http: Http) {
    const ownerId = http.state.get("authUser");

    const waves = await WaveModel.find({ ownerId });

    return waves;
  },
  async makeWave(http: Http, value: any) {
    const ownerId = http.state.get("authUser");
    const newWave = WaveModel.make({
      slug: slugifyTitle(value.waveName),
      ownerId,
      ...value
    });

    $.events.emit("WaveEvents.createActivity", newWave);

    return await newWave.save();
  }
};
