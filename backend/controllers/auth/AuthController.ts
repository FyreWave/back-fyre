import { Controller, Http } from "xpresser/types/http";

import authValidator from "./auth.validators";
import authService from "./auth.service";

/**
 * AuthController
 */
export = <Controller.Object>{
  // Controller Name
  name: "AuthController",

  // Controller Default Error Handler.
  e: (http: Http, error: string) => http.status(401).json({ error }),

  /**
   * Example Action.
   * @param http - Current Http Instance
   */
  async register(http) {
    try {
      const body = http.$body.all();

      const { value } = authValidator.registerValidator(body);

      const result = await authService.register(http, value);

      return http.status(201).send({
        result,

        message: "User Registered Successfully !!!!"
      });
    } catch (error) {
      return http.status(400).send({
        message: "User Registration Failed",
        error
      });
    }
  },

  async login(http) {
    try {
      const body = http.$body.all();

      const { value, error } = authValidator.loginValidator(body);

      const result = await authService.login(http, value);

      return http.status(200).send({
        result,
        message: "Login Successful, Redirecting you to your dashboard!"
      });
    } catch (error) {
      return http.status(400).send({
        message: "User login Failed",
        error
      });
    }
  }
};
