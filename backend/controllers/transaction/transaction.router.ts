import { getInstanceRouter } from "xpresser";

const router = getInstanceRouter();

router
  .path("/transaction/", () => {
    router.get(
      "get-transaction/:reference",
      "./transaction/Transaction@getOneTransaction"
    );
    router.put("@updateTransaction");
    router.post("@getAllTransactions");
    router.post("@createTransaction");
    router.post("@paymentCallback");
  })
  .controller("./transaction/transaction");
