import WaveModel from "../../models/WaveModel";

import { Http } from "xpresser/types/http";
import { $, slugifyTitle } from "../../exports";

export = {
  async getAllWaves(http: Http) {
    const ownerId = http.state.get("authUser");
    const value = http.$body.all();

    const waves = await WaveModel.native().find({ ownerId }).limit(value.limit).toArray();

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

    $.events.emit("WaveEvents.createActivity", {
      activity: "created",
      ...newWave
    });

    return await newWave.save();
  }
};
