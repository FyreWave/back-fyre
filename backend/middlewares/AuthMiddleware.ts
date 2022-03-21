import { Http } from "xpresser/types/http";
import User from "../models/User";

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
  validateAuth(http: Http): any {
    console.log("i ran");
    const skip = ["/api/client/ping"];

    const authToken = http.req.headers["cms-hit"];

    const currentUrl = http.req.originalUrl;

    if (skip.includes(currentUrl) && !authToken) return http.next();

    if (!authToken) {
      return http.toApiFalse({
        next: "logout",
        error: "You are not logged in!"
      });
    }

    let data: any;
    try {
      data = jwt.verify(authToken, "actionfilm");

      // set authUsername
      // console.log(data);
      http.state.set("authUser", User.id(data.id));

      http.next();
    } catch {
      http.next();
    }

    // console.log("AuthMiddleware is running", authToken);
  },

  async getCurrentUser(http: Http) {
    if (http.state.has("authUser")) {
      const user = await User.findById(http.state.get("authUser"));

      http.state.set("currentUser", user);
    }
    return http.next();
  }
};
