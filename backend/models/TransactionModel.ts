import { is, XMongoSchema, XMongoModel } from "xpress-mongo";
import { UseCollection } from "@xpresser/xpress-mongo";

import { customAlphabet } from "nanoid";

/**
 * Interface for Model's `this.data`.
 * Optional if accessing data using model helper functions
 */

const generateShortId = customAlphabet(
  [
    "abcdefghijklmnopqrstuvwxyz",
    "1234567890",
    "abcdefghijklmnopqrstuvwxyz".toUpperCase()
  ].join(""),
  5
);

export const PaymentMethods = ["cash", "card", "bank_transfer"];
export type PaymentMethodsType = "cash" | "card" | "bank_transfer";

export interface TransactionModelDataType {
  updatedAt?: Date;
  createdAt: Date;
  uuid: string;
  shortId: string;
  paid: string;
  waveId: string;
  userId: string;

  amount: number;
  paymentMethod: PaymentMethodsType;
  fee: number;
  status: "created" | "paid" | "completed";
  paystack?: {
    reference: string;
    status: string;
    paid_at: string;
    channel: string;
  };
  markedAsPaid?: { by: string; date: Date };
  coupon?: string;
}

/**
 * TransactionModel Model
 * Collection: `transaction_models`
 */
class TransactionModel extends XMongoModel {
  // Enable strict
  static strict = { removeNonSchemaFields: true };
  // Set Model Schema
  static schema: XMongoSchema = {
    updatedAt: is.Date(),
    createdAt: is.Date().required(),
    uuid: is.Uuid().required(),
    paid: is.Boolean(false).required(),
    shortId: is
      .String(() => {
        return generateShortId();
      })
      .required(),
    amount: is.Number().required(),
    paymentMethod: is.String("card").required(),
    waveId: is.ObjectId().required(),
    userId: is.ObjectId().required(),
    status: is.String("created").required(),
    paystack: is.Object().undefined(),
    markedAsPaid: is.Object().undefined()
  };

  public data!: TransactionModelDataType;

  markAsPaid(add: Record<string, any> = {}) {
    return this.set({
      status: "paid",
      paid: true,
      ...add
    }).save();
  }
}

/**
 * Map Model to Collection: `transaction_models`
 * .native() will be made available for use.
 */
UseCollection(TransactionModel, "transaction");

export default TransactionModel;
