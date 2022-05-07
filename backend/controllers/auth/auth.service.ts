import UserModel, { UserDataType } from "../../models/UserModel";

import { Http } from "xpresser/types/http";
import { compare, hash } from "@techie04/xpresser-bcrypt";
import { createToken } from "../../exports";
const privateFields = ["password", "_id"];

export = {
  async register(http: Http, value: UserDataType) {
    value.password = hash(value.password) as string;

    const existingUser = await UserModel.count({
      email: value.email
    });

    if (existingUser) {
      throw "User with email already exists";
    }

    try {
      const user = await UserModel.new(value);
      return user.omit(privateFields);
    } catch (error) {
      throw "User with email already exists";
    }
  },

  async login(http: Http, value: UserDataType) {
    const user = await UserModel.findOne({ email: value.email });

    if (!user) {
      throw "Invalid Credentials";
    }

    console.log(user, "usXXX");

    if (!compare(value.password, user.data.password)) throw "Invalid Credentials";

    const token = createToken(user.id().toString());

    await user.update({
      lastSeenAt: new Date()
    });

    return { token, ...{ user: user.omit(privateFields) } };
  }
};
