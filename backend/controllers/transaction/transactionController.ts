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
    console.log("getOneTransaction here");
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
  async getAllTransactions(http) {
    try {
      const result = await transactionService.getAllTransactions();

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

      /*   console.log(body);

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
      const result = await transactionService.createTransaction(http);

      return http.toApi({
        message: "New transaction created",
        result: result.toCollection().pick(["reference", "shortId"])
      });
    } catch (error) {
      return http.status(400).send({
        message: "transaction error",
        error
      });
    }
  }
};

// https://www.fyrewave.ngrok.io/api/payment/payment-callback
// ?status=successful
// &tx_ref=bitethtx-019203
// &transaction_id=3247567

// https://www.fyrewave.ngrok.io/api/payment/payment-callback?status=successful&tx_ref=bitethtx-019203&transaction_id=3247701
