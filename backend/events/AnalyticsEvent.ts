/**
 * AnalyticsEvent
 */
import { Http } from "xpresser/types/http";

export = {
  namespace: "analyticsEvent",

  /**
   * The `index` method is called by default.
   * it also inherits namespace as name.
   */
  index(http: any) {
    console.log("save something to datababse");
    // Your Code
  }
};
