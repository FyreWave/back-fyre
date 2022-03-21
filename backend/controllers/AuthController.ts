import { Controller, Http } from "xpresser/types/http";

import User, { UserDataType } from "../models/User";
import { compare, hash } from "@techie04/xpresser-bcrypt";

/**
 * AuthController
 */
export = <Controller.Object>{
  // Controller Name
  name: "AuthController",

  // Controller Default Error Handler.
  e: (http: Http, error: string) => http.status(401).json({ error }),

  middlewares: {
    Abolish: "*"
  },

  /**
   * Example Action.
   * @param http - Current Http Instance
   */
  async register(http) {
    // prettier-ignore
    type body = {
            email?: string;
            password: string;
            mobile?: string;
        };

    // Get validated body
    // const user = http.$body.all()
    // const user = http.validatedBody;
    const body = http.validatedBody<body>();

    body.password = hash(body.password) as string;

    const existingUser = await User.count({
      email: body.email
    });
    if (existingUser) {
      console.log("User already exists");
      return http.status(400).send({
        error: "User already exists"
      });

      // throw new Error("Email has been taken");
    }

    try {
      await User.new(body);
      return http.status(201).send({
        message: "User Registered Successfully"
      });
    } catch (error) {
      return http.status(400).send({
        error: "User already exists"
      });
    }
  }
};
