import { is, XMongoSchema, XMongoModel, omitIdAndPick } from "xpress-mongo";
import { UseCollection } from "@xpresser/xpress-mongo";

/**
 * Interface for Model's `this.data`.
 * Optional if accessing data using model helper functions
 */
export interface BaseModelDataType {
  updatedAt?: Date;
  createdAt: Date;
}

/**
 * MainModel Model
 * Collection: `main_models`
 */
class BaseModel extends XMongoModel {
  static publicFields: string[] = [];

  static projectPublicFields(add: string[] = [], except: string[] = []) {
    let fields = this.publicFields;
    // If add concat fields
    if (add.length) fields = fields.concat(add);

    // If remove fields
    if (except.length) fields = fields.filter((v) => !except.includes(v));

    return omitIdAndPick(fields);
  }

  /*  static projectPublicFields() {
    return omitIdAndPick(this.publicFields);
  }*/

  publicFields() {
    const publicFields = this.$static<typeof BaseModel>().publicFields;
    return this.toCollection().pick(publicFields);
  }

  omit<T = any>(omit: string[]): T {
    return this.toCollection().omit(omit);
  }
  public data!: BaseModelDataType;
}

export default BaseModel;
