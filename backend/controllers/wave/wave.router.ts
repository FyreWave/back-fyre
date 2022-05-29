import { getInstanceRouter } from "xpresser";
const router = getInstanceRouter();

router
  .path("/wave/", () => {
    router.post("@makeWave");

    router.post("@getAllWaves");
    router.get("get-wave-summary/:waveId", "wave/Wave@getWaveSummary");
    router.get("get-wave/:waveId", "wave/Wave@getWave");
    router.get("join-wave/:waveId", "wave/Wave@joinWave");
  })
  .controller("./wave/wave")
  .middlewares(["Auth.getCurrentUserA"]);
