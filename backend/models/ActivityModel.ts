import { is, XMongoSchema, XMongoModel } from "xpress-mongo";
import { UseCollection } from "@xpresser/xpress-mongo";

/**
 * Interface for Model's `this.data`.
 * Optional if accessing data using model helper functions
 */
export interface ActivityModelDataType {
  updatedAt?: Date;
  createdAt: Date;
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
    to: is.ObjectId().required(),
    action: is.String().optional(),
    amount: is.Number().optional()
  };

  public data!: ActivityModelDataType;
}

/**
 * Map Model to Collection: `activity_models`
 * .native() will be made available for use.
 */
UseCollection(ActivityModel, "activity_models");

export default ActivityModel;
