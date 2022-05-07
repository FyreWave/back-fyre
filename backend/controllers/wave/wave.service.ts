import WaveModel from "../../models/WaveModel";

import { Http } from "xpresser/types/http";

export = {
  async getAllWaves(http: Http) {
    const ownerId = http.state.get("authUser");

    console.log(ownerId);
    const waves = await WaveModel.find({ ownerId });

    return waves;
  }
};
