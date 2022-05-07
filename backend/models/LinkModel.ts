import { is, XMongoSchema, XMongoModel } from "xpress-mongo";
import { UseCollection } from "@xpresser/xpress-mongo";

/**
 * Interface for Model's `this.data`.
 * Optional if accessing data using model helper functions
 */
export interface LinkModelDataType {
  updatedAt?: Date;
  createdAt: Date;
  shortUrl: string;
}

/**
 * LinkModel Model
 * Collection: `link_models`
 */
class LinkModel extends XMongoModel {
  // Set Model Schema
  static schema: XMongoSchema = {
    updatedAt: is.Date(),
    createdAt: is.Date().required(),
    waveId: is.Object().required(),
    shortUrl: is.String().required(),
    url: is.String().required(),
    clicks: is.Number().default(0),
    lastClick: is.Date()
  };

  public data!: LinkModelDataType;
}

/**
 * Map Model to Collection: `link_models`
 * .native() will be made available for use.
 */
UseCollection(LinkModel, "link_models");

export default LinkModel;
