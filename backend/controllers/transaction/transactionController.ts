import { Controller, Http } from "xpresser/types/http";

import transactionService from "./transaction.service";
import transactionValidator from "./transaction.validators";

/**
 * TransactionController in
 */
export = <Controller.Object>{
  // Controller Name
  name: "TransactionController",

  // Controller Default Error Handler.
  e: (http: Http, error: string) => http.status(401).json({ error }),

  /**
   * Example Action.
   * @param http - Current Http Instance
   */

  // Example Action

  async getOneTransaction(http) {
    const result = await transactionService.getOneTransaction(http);

    return http.toApi({
      result
    });
  },
  async updateTransaction(http) {
    const result = await transactionService.updateTransaction(http);

    return http.toApi({
      result
    });
  },
  async getAllDeposits(http) {
    try {
      const result = await transactionService.getAllDeposits(http);

      return http.status(200).toApi(result, true, 200);
    } catch (error) {
      return http.status(400).send({
        message: "transaction error",
        error
      });
    }
  },
  async paymentCallback(http) {
    try {
      const body = http.$body.all();

      /*   ;

      const { value } = transactionValidator.paymentCallbackValidator(body);*/

      const result = await transactionService.paymentCallback(http, body);

      return http.status(200).send({
        message: "New transaction created ??????",
        result
      });
    } catch (error) {
      return http.status(400).send({
        message: "transaction failed",
        error
      });
    }
  },

  async createTransaction(http) {
    try {
      const body = http.$body.all() as {
        _id: string;
        userId: string;
      };

      const result = await transactionService.createTransaction(http, body);

      return http.toApi({
        message: "New transaction created",
        result: result.toCollection().pick(["uuid", "shortId"])
      });
    } catch (error) {
      console.log(error);
      return http.status(400).send({
        message: "transaction error",
        error
      });
    }
  },

  async resetTransaction(http) {
    try {
      const result = await transactionService.resetTransaction(http);

      return http.toApi({
        message: "payment reset",
        result
      });
    } catch (error) {
      return http.status(400).send({
        message: "transaction error",
        error
      });
    }
  },

  async addReferenceId(http) {
    try {
      const body = http.$body.all();
      const result = await transactionService.addReferenceId(http, body);

      return http.toApi({
        message: "added paystack reference",
        result
      });
    } catch (error) {
      return http.status(400).send({
        message: "transaction error",
        error
      });
    }
  }
};
