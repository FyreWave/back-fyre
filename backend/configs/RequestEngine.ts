import { Maybe } from "../types/ts";
import UserModel from "../models/UserModel";
import { ObjectId } from "xpress-mongo";
import { $ } from "./xpresser";

class RequestEngine extends $.extendedRequestEngine() {
  /**
   * Get Auth Id
   */
  authId(): Maybe<ObjectId> {
    return this.state.get("authId");
  }

  /**
   * Check if user is logged in.
   */
  isLogged() {
    return !!this.authId();
  }

  /**
   * Get logged user.
   */
  authUser() {
    console.log("RequestEngine");
    return "user";
  }

  async loadAuthUser(options?: Record<string, any>, saveToState = true) {
    const user = await UserModel.findById(this.authId()!, options);

    if (saveToState) this.addToBoot("authUser", user);

    return user;
  }

  /**
   * Custom Error function.
   * @param err
   * @param status
   */
  error(err: string | Error, status: number = 500) {
    let message;

    if (typeof err === "string") message = err;
    else message = err.message;

    return this.status(status).json({
      error: message
    });
  }

  /**
   * Custom Server Error function.
   * @param err
   * @param status
   */
  serverError(err: any, status: number = 500) {
    return this.error(err, status);
  }

  /**
   * Custom Client Error function.
   * @param err
   * @param status
   */
  badRequest(err: string | Error, status: number = 400) {
    return this.error(err, status);
  }

  /**
   * Custom Client Error function.
   * @param err
   * @param status
   */
  unAuthorized(err: string | Error, status: number = 401) {
    return this.error(err, status);
  }
}

declare module "xpresser/types/http" {
  interface Http extends RequestEngine {}
}

export = RequestEngine;
