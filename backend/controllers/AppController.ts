import { Controller, Http } from "xpresser/types/http";
import User from "../models/User";

const AppController = <Controller.Object>{
  /**
   * Controller name.
   * @type {string}
   */
  name: "AppController",

  /**
   * Index Method for "/"
   * @returns {string}
   */

  index(http) {
    return {
      message: "No index access allowed!"
    };
  },

  ping(http) {
    // check if included in excluded routes

    //get user from server state coming from middleware ^^
    let user: User | null = http.state.get("authUser");
    return http.send({
      user
    });
  },

  /*  async ping(http) {
    // check if included in excluded routes

    const appData = await AppConfig.native().findOne(
      {},
      { projection: { _id: 0, createdAt: 0 } }
    );

    //get user from server state coming from middleware ^^
    let user: User | null = http.state.get("currentUser");
    return http.send({
      appData,
      user: user?.toCollection().pick(["email", "role", "uuid"])
    });
  },*/

  api404(http: Http): Http.Response {
    return http.toApiFalse(
      {
        error: 404
      },
      404
    );
  }
};

export = AppController;
