import { is, XMongoSchema, XMongoModel } from "xpress-mongo";
import { UseCollection } from "@xpresser/xpress-mongo";

/**
 * Interface for Model's `this.data`.
 * Optional if accessing data using model helper functions
 */
export interface ActivityDataType {
  updatedAt?: Date;
  createdAt: Date;
  waveId: String;
  from: String;
  to?: String;
  action?: String;
  amount?: Number;
}

/**
 * ActivityModel Model
 * Collection: `activity_models`
 */
class ActivityModel extends XMongoModel {
  // Set Model Schema
  static schema: XMongoSchema = {
    updatedAt: is.Date(),
    createdAt: is.Date().required(),
    waveId: is.ObjectId().required(),
    from: is.ObjectId().required(),
    to: is.ObjectId().optional(),
    action: is.String().optional(),
    amount: is.Number().optional()
  };
  public data!: ActivityDataType;
}

/**
 * Map Model to Collection: `activity_models`
 * .native() will be made available for use.
 */
UseCollection(ActivityModel, "activity_");

export default ActivityModel;
