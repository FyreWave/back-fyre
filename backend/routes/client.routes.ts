import { getInstanceRouter } from "xpresser";

const router = getInstanceRouter();

router
  .path("/client/", () => {
    router.post("@makeWave");
    router.get("@allWaves");
    router.get("get-wave/:waveId", "Wave@getWave");
  })
  .controller("Wave")
  .middlewares(["Auth.validateAuth", "Auth.getCurrentUser"]);

router
  .path("/client/", () => {
    router.post("@register");
    router.post("@login");
  })
  .controller("Auth");

router
  .path("/client/", () => {
    router.get("@ping");
  })
  .controller("App")

  .middlewares(["Auth.validateAuth", "Auth.getCurrentUser"]);
