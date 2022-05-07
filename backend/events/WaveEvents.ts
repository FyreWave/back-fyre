/**
 * WaveEvents
 */
import LinkModel from "../models/LinkModel";
import { $ } from "../exports";

export = {
  namespace: "WaveEvents",

  /**
   * The `index` method is called by default.
   * it also inherits namespace as name.
   */

  async createLink(wave: any) {
    // console.log("wave link Created !!!", wave.data);
    const newLink = LinkModel.make({
      waveId: wave.id(),
      shortUrl: $.helpers.randomStr(6),
      url: `https://www.fyrewave/view-wave/${wave.data.slug}`
    });
    await newLink.save();

    console.log("newLink", newLink);

    // Your Code
  },

  createActivity(wave: any) {
    console.log("wave activity Created !!!", wave);
  }
};
