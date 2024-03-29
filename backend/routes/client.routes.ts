import { getInstanceRouter } from "xpresser";

const router = getInstanceRouter();

/*router
  .path("/client/", () => {
    router.post("@makeWave");
    router.get("@allWaves");
    router.get("get-wave/:waveId", "Wave@getWave");
  })
  .controller("Wave")
  .middlewares(["Auth.getCurrentUserA"]);*/

router
  .path("/client/", () => {
    router.get("@ping");
  })
  .controller("App")
  .middlewares(["Auth.getCurrentUserA"]);
// .middlewares(["Auth.validateAuth", "Auth.getCurrentUser"]);
