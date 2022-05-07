import { getInstanceRouter } from "xpresser";

const router = getInstanceRouter();

router
  .path("/transaction/", () => {
    router.post("@paymentCallback");
    router.post("@getAllTransactions");
  })
  .controller("../transaction/transaction.controller");
