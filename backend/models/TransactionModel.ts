import {is, XMongoSchema, XMongoModel} from 'xpress-mongo';
import {UseCollection} from '@xpresser/xpress-mongo';

/**
 * Interface for Model's `this.data`.
 * Optional if accessing data using model helper functions
 */
export interface TransactionModelDataType {
    updatedAt?: Date,
    createdAt: Date,
}

/**
 * TransactionModel Model
 * Collection: `transaction_models`
 */
class TransactionModel extends XMongoModel {

    // Set Model Schema
    static schema: XMongoSchema = {
        updatedAt: is.Date(),
        createdAt: is.Date().required(),
        references: is.String().required(),
    };

    public data!: TransactionModelDataType;
}

/**
* Map Model to Collection: `transaction_models`
* .native() will be made available for use.
*/
UseCollection(TransactionModel, "transaction_models");

export default TransactionModel;
