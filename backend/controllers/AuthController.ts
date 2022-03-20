import {Controller, Http} from "xpresser/types/http";

import User, { UserDataType } from "../models/User";
import { compare, hash } from "@techie04/xpresser-bcrypt";


/**
 * AuthController
 */
export = <Controller.Object>{
    // Controller Name
    name: "AuthController",

    // Controller Default Error Handler.
    e: (http: Http, error: string) => http.status(401).json({ error }),


    /**
    * Example Action.
    * @param http - Current Http Instance
    */
    async register(http, _b, e) {
        // prettier-ignore


        // Get validated body
        const body = http.$body.all()


        return http.status(200).json({
            message: "Register Successfully",
            data: body
        })


    },
};
