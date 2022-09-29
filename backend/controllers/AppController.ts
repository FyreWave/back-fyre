import { Controller, Http } from "xpresser/types/http";
import UserModel from "../models/UserModel";

const AppController = <Controller.Object>{
  /**
   * Controller name.
   * @type {string}
   */
  name: "AppController",

  middlewares: {},

  /**
   * Index Method for "/"
   * @returns {string}
   */

  ping(http) {
    // check if included in excluded routes

    //get user from server state coming from middleware ^^
    const user: UserModel | null = http.state.get("currentUser");

    return http.send({
      user: user?.toCollection().pick(["email", "lastSeenAt", "username"]),
      info: {
        name: "FryeWave App",
        version: "1.0.0",
        description: "Crowd and group funding app"
      }
    });
  },

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
