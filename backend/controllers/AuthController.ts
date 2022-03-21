import { Controller, Http } from "xpresser/types/http";

import User, { UserDataType } from "../models/User";
import { compare, hash } from "@techie04/xpresser-bcrypt";
import { createToken } from "../exports";

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
  },

  async login(http, e) {
    type body = { email: string; password: string };
    const { email, password } = http.validatedBody<body>();
    const privateFields = ["password", "_id"];

    const user = await User.findOne({ email });
    if (!user) {
      return http.status(400).send({
        error: "Invalid Credentials"
      });
    }

    if (!compare(password, user.data.password)) return e("Invalid Credentials");

    const token = createToken(user.id().toString());

    await user.update({
      lastSeenAt: new Date()
    });

    console.log(token);
    return http.status(200).send({
      user: user.omit(privateFields),
      token,
      message: "Login Successful, Redirecting you to your dashboard!"
    });
  }
};
