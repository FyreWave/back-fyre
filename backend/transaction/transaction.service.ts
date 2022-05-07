import TransactionModel from "../models/TransactionModel";

import { Controller, Http } from "xpresser/types/http";

export = {
  async getAllTransactions() {
    const transactions = await TransactionModel.find();

    return transactions;
  },
  async paymentCallback(http: any, value: any) {
    const transaction = await TransactionModel.find();
    /*
       const transaction = await TransactionModel.make({
           ...value,
       })

       await transaction.save();

        return transaction*/

    return transaction;
  }
};
