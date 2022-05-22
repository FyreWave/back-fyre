import { getInstanceRouter } from "xpresser";

const router = getInstanceRouter();

router.post("/transaction/payment-callback", "transaction/Transaction@paymentCallback");

router
  .path("/transaction/", () => {
    router.get("get-transaction/:uuid", "transaction/Transaction@getOneTransaction");
    router.put("@updateTransaction");
    router.post("@getAllDeposits");
    router.post("@createTransaction");
    router.post("paystack", "transaction/Transaction@addReferenceId");
  })
  .controller("transaction/transaction")
  .middlewares(["Auth.getCurrentUserA"]);
