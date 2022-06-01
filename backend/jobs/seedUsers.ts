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
    const list_of_users = userDb.map((user) => {
      return {
        _id: UserModel.id(user._id),
        updatedAt: new Date(user.updatedAt),
        createdAt: new Date(user.createdAt),
        password: user.password,
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        mobile: user.mobile,
        role: user.role,
        lastSeenAt: new Date(user.lastSeenAt)
      };
    });

    const newUsers = await UserModel.native().insertMany(list_of_users);

    const $ = job.$;

    $.log(`Job: Seeded ${list_of_users.length} Users...`);

    // End current job process.
    return job.end();
  }
};
