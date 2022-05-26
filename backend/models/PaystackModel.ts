import { is, XMongoSchema, XMongoModel } from "xpress-mongo";
import { UseCollection } from "@xpresser/xpress-mongo";

/**
 * Interface for Model's `this.data`.
 * Optional if accessing data using model helper functions
 */
export interface PaystackModelDataType {
  updatedAt?: Date;
  createdAt: Date;
}

/**
 * PaystackModel Model
 * Collection: `paystack_models`
 */
class PaystackModel extends XMongoModel {
  // Set Model Schema
  static schema: XMongoSchema = {
    updatedAt: is.Date(),
    createdAt: is.Date().required()
  };

  public data!: PaystackModelDataType;
}

/**
 * Map Model to Collection: `paystack_models`
 * .native() will be made available for use.
 */
UseCollection(PaystackModel, "paystack");

export default PaystackModel;
