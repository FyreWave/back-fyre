import { getInstanceRouter } from "xpresser";
const router = getInstanceRouter();

router
  .path("/wave/", () => {
    router.post("@makeWave");

    router.post("@getAllWaves");
    router.get("get-wave/:waveId", "./wave/Wave@getWave");
  })
  .controller("./wave/wave")
  .middlewares(["Auth.getCurrentUserA"]);
