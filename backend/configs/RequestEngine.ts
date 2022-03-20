import { Maybe } from "../types/ts";
import User from "../models/User";
import { ObjectId } from "xpress-mongo";
import { $ } from "./xpresser";

class RequestEngine extends $.extendedRequestEngine() {
    /**
     * Set default pagination queries.
     */
    paginationQuery() {
        return this.$query.defaults({ page: 1, perPage: 30 }).pick(["page", "perPage"]) as {
            page: number;
            perPage: number;
        };
    }

    /**
     * Get Auth Id
     */
    authId(): Maybe<ObjectId> {
        return this.state.get("authId");
    }

    /**
     * Check if user is logged in.
     */
    isLogged() {
        return !!this.authId();
    }

    /**
     * Get logged user.
     */
    authUser(): Maybe<User> {
        return this.state.get("boot.authUser");
    }

    async getAuthUser(options?: Record<string, any>) {
        // Get from state
        let user = this.authUser();

        // If user is not found in state, try to find it in database
        if (!user) user = await this.loadAuthUser(options, false);

        return user;
    }

    async loadAuthUser(options?: Record<string, any>, saveToState = true) {
        const user = await User.findById(this.authId()!, options);

        if (saveToState) this.addToBoot("authUser", user);

        return user;
    }

    /**
     * Custom Error function.
     * @param err
     * @param status
     */
    error(err: string | Error, status: number = 500) {
        let message;

        if (typeof err === "string") message = err;
        else message = err.message;

        return this.status(status).json({
            error: message
        });
    }

    /**
     * Custom Server Error function.
     * @param err
     * @param status
     */
    serverError(err: any, status: number = 500) {
        return this.error(err, status);
    }

    /**
     * Custom Client Error function.
     * @param err
     * @param status
     */
    badRequest(err: string | Error, status: number = 400) {
        return this.error(err, status);
    }

    /**
     * Custom Client Error function.
     * @param err
     * @param status
     */
    unAuthorized(err: string | Error, status: number = 401) {
        return this.error(err, status);
    }
}

declare module "xpresser/types/http" {
    interface Http extends RequestEngine {}
}

export = RequestEngine;
