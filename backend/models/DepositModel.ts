import {is, XMongoSchema, XMongoModel} from 'xpress-mongo';
import {UseCollection} from '@xpresser/xpress-mongo';

/**
 * Interface for Model's `this.data`.
 * Optional if accessing data using model helper functions
 */
export interface DepositModelDataType {
    updatedAt?: Date,
    createdAt: Date,
    amount: number,
    userId: string,
    waveId: string,
    description: string,
    status: "pending"  | "cancelled" | "completed" | "failed",
    transactionId: string,
    cardNumber: string,
}

/**
 * DepositModel Model
 * Collection: `deposit_models`
 */
class DepositModel extends XMongoModel {

    // Set Model Schema
    static schema: XMongoSchema = {
        updatedAt: is.Date(),
        createdAt: is.Date().required()
    };

    public data!: DepositModelDataType;
}

/**
* Map Model to Collection: `deposit_models`
* .native() will be made available for use.
*/
UseCollection(DepositModel, "deposit_models");

export default DepositModel;
