import JobHelper from "xpresser/src/Console/JobHelper";
import WaveModel from "../models/WaveModel";
const fs = require("fs");

/**
 *  Job: MakeWaves
 */
export = {
  // Job Handler
  async handler(args: string[], job: JobHelper): Promise<any> {
    // Your Job Here

    const allWaves = await WaveModel.find({});

    // console.log(JSON.stringify(allWaves));

    fs.writeFileSync("myfile.json", JSON.stringify(allWaves));

    // End current job process.
    return job.end();
  }
};
