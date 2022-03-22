import { is, XMongoSchema, XMongoModel } from "xpress-mongo";
import { UseCollection } from "@xpresser/xpress-mongo";
import BaseModel from "./BaseModel";

/**
 * Interface for Model's `this.data`.
 * Optional if accessing data using model helper functions
 */
export interface WaveDataType {
  updatedAt?: Date;
  createdAt: Date;
}

/**
 * Wave Model
 * Collection: `waves`
 */
class Wave extends BaseModel {
  // Set Model Schema
  static schema: XMongoSchema = {
    updatedAt: is.Date(),
    createdAt: is.Date().required(),
    waveName: is.String().required(),
    waveDescription: is.String().required(),
    targetAmount: is.Number().optional(),
    dueDate: is.Date().required(),
    waveType: is.String("group").required(),
    waveLink: is.String().optional(),
    canWithdraw: is.Boolean(false).required(),
    ownerId: is.ObjectId().required(),
    slug: is.String().optional()
  };

  public data!: WaveDataType;
}

/**
 * Map Model to Collection: `waves`
 * .native() will be made available for use.
 */
UseCollection(Wave, "waves");

export default Wave;
