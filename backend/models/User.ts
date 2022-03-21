import { is, XMongoSchema, XMongoModel } from "xpress-mongo";
import { UseCollection } from "@xpresser/xpress-mongo";
import BaseModel from "./BaseModel";

/**
 * Interface for Model's `this.data`.
 * Optional if accessing data using model helper functions
 */
export interface UserDataType {
  updatedAt?: Date;
  createdAt: Date;
  avatar?: string;
  username: string;
  mobile: string;
  email: string;
  password: string;
}

/**
 * User Model
 * Collection: `users`
 */
class User extends BaseModel {
  // Set Model Schema
  static schema: XMongoSchema = {
    updatedAt: is.Date(),
    createdAt: is.Date().required(),
    avatar: is.String().optional(),
    username: is.String().optional(),
    mobile: is.String().optional(),
    email: is.String().optional(),
    password: is.String().required()
  };

  public data!: UserDataType;
}

/**
 * Map Model to Collection: `users`
 * .native() will be made available for use.
 */
UseCollection(User, "users");

export default User;
