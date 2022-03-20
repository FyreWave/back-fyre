import {is, XMongoSchema, XMongoModel} from 'xpress-mongo';
import {UseCollection} from '@xpresser/xpress-mongo';

/**
 * Interface for Model's `this.data`.
 * Optional if accessing data using model helper functions
 */
export interface DepositDataType {
    updatedAt?: Date,
    createdAt: Date,
}

/**
 * Deposit Model
 * Collection: `deposits`
 */
class Deposit extends XMongoModel {

    // Set Model Schema
    static schema: XMongoSchema = {
        updatedAt: is.Date(),
        createdAt: is.Date().required(),
        cardNumber: is.Number().required(),
        amount: is.Number().required(),
        waveId: is.ObjectId().required(),
    };

    public data!: DepositDataType;
}

/**
* Map Model to Collection: `deposits`
* .native() will be made available for use.
*/
UseCollection(Deposit, "deposits");

export default Deposit;
