import { ParamsMiddleware } from "@xpresser/params-loader";
import WaveModel from "../models/WaveModel";

export = ParamsMiddleware({
  waveId: {
    as: "wave",
    addToBoot: true,
    load: (waveId) => WaveModel.findOne({ slug: waveId }),
    loadError: (http, error) =>
      http.status(500).send(`Error loading user: ${error.message}`),
    notFound: (http, waveId) => http.status(400).send(`waveId '${waveId}' not found!`)
  }
});
