import { Controller, Http } from "xpresser/types/http";

/**
 * WaveLinkController
 */
export = <Controller.Object>{
  // Controller Name
  name: "WaveLinkController",

  // Controller Default Error Handler.
  e: (http: Http, error: string) => http.status(401).json({ error }),

  /**
   * Example Action.
   * @param http - Current Http Instance
   */
  generateLink(http) {
 
    const body = http.$body.all();

  
    return http.send({
      route: http.route
    });
  }
};
