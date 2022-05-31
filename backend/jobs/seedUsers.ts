import JobHelper from "xpresser/src/Console/JobHelper";
import UserModel from "../models/UserModel";

import userDb from "./users.json";

/**
 *  Job: Users
 */
export = {
  // Job Handler
  async handler(args: string[], job: JobHelper): Promise<any> {
    // Your Job Here
    // const numberOfStaffs = Number(4);

    let i = 0;
    const fmtUsers = userDb.map((user) => {
      return {
        _id: UserModel.id(user._id),
        updatedAt: new Date(user.updatedAt),
        createdAt: new Date(user.createdAt),
        password: user.password,
        email: user.email,
        mobile: user.mobile,
        role: user.role,
        lastSeenAt: new Date(user.lastSeenAt)
      };
    });

    do {
      const newUsers = await UserModel.native().insertMany(fmtUsers);

      i++;
    } while (i < userDb.length);

    const $ = job.$;

    $.log("Job: Seed Users...");
    const users = await UserModel.find({});

    console.log(JSON.stringify(users, null, 2));
    // End current job process.
    return job.end();
  }
};
