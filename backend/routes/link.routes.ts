import { getInstanceRouter } from "xpresser";

const router = getInstanceRouter();

router
  .path("/link/", () => {
    router.post("@generateLink");
  })
  .controller("WaveLink")
  .middlewares(["Auth.getCurrentUserA"]);
