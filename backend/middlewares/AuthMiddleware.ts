import { Http } from "xpresser/types/http";
import UserModel from "../models/UserModel";

const jwt = require("jsonwebtoken");

const maxAge = 3 * 24 * 60 * 60;
const createToken = (id: any) => {
  return jwt.sign({ id }, "actionfilm", {
    expiresIn: maxAge
  });
};

/**
 * AuthMiddleware
 */
export = {
  /**
   * Default Middleware Action
   * @param {Xpresser.Http} http
   */

  async getCurrentUserA(http: Http) {
    const body = http.$body.all();

    const authToken = http.req.headers["cms-hit"];

    if (!authToken) {
      return http.status(200).send({
        message: "You are not logged in!"
      });
    }

    let data: any;
    try {
      data = jwt.verify(authToken, "actionfilm");

      http.state.set("authUser", UserModel.id(data.id));

      if (http.state.has("authUser")) {
        const user = await UserModel.findById(http.state.get("authUser"));

        http.state.set("currentUser", user);
      }

      http.next();
    } catch {
      http.next();
    }
  },

  validateAuth(http: Http): any {
    const skip = ["/api/client/ping"];

    const authToken = http.req.headers["cms-hit"];

    const currentUrl = http.req.originalUrl;

    if (skip.includes(currentUrl) && !authToken) return http.next();

    if (!authToken) {
      return http.status(400).send({
        error: "You are not logged in!"
      });
    }

    let data: any;
    try {
      data = jwt.verify(authToken, "actionfilm");

      // set authUsername
      http.state.set("authUser", UserModel.id(data.id));

      http.next();
    } catch {
      http.next();
    }

    // console.log("AuthMiddleware is running", authToken);
  },

  async getCurrentUser(http: Http) {
    if (http.state.has("authUser")) {
      const user = await UserModel.findById(http.state.get("authUser"));

      http.state.set("currentUser", user);
    }
    return http.next();
  }
};
