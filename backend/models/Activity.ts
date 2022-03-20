import {is, XMongoSchema, XMongoModel} from 'xpress-mongo';
import {UseCollection} from '@xpresser/xpress-mongo';

/**
 * Interface for Model's `this.data`.
 * Optional if accessing data using model helper functions
 */
export interface ActivityDataType {
    updatedAt?: Date,
    createdAt: Date,
}

/**
 * Activity Model
 * Collection: `activities`
 */
class Activity extends XMongoModel {

    // Set Model Schema
    static schema: XMongoSchema = {
        updatedAt: is.Date(),
        createdAt: is.Date().required(),
        userId: is.ObjectId().required(),
        type: is.String().required(),
        amount: is.Number().optional(),
        inviteeId: is.ObjectId().optional(),
    };

    public data!: ActivityDataType;
}

/**
* Map Model to Collection: `activities`
* .native() will be made available for use.
*/
UseCollection(Activity, "activities");

export default Activity;
