import { is, XMongoSchema, XMongoModel } from "xpress-mongo";
import { UseCollection } from "@xpresser/xpress-mongo";

/**
 * Interface for Model's `this.data`.
 * Optional if accessing data using model helper functions
 */
export interface WaverDataType {
  updatedAt?: Date;
  createdAt: Date;
  waveId: string;
  userId: string;
  amount: number;
  transactionId: string;
}

/**
 * Waver Model
 * Collection: `wavers`
 */
class WaverModel extends XMongoModel {
  // Set Model Schema
  static schema: XMongoSchema = {
    updatedAt: is.Date(),
    createdAt: is.Date().required(),
    waveId: is.ObjectId().required(),
    userId: is.ObjectId().required(),
    transactionId: is.String().optional(),
    amount: is.Number().optional()
  };

  public data!: WaverDataType;
}

/**
 * Map Model to Collection: `wavers`
 * .native() will be made available for use.
 */
UseCollection(WaverModel, "wavers");

export default WaverModel;
