import { getInstanceRouter } from "xpresser";
const router = getInstanceRouter();

router
  .path("/wave/", () => {
    router.post("@makeWave");

    router.get("@getAllWave");
    // router.get("get-wave/:waveId", "Wave@getWave");
  })
  .controller("./wave/wave")
  .middlewares(["Auth.getCurrentUserA"]);
