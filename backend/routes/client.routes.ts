import { getInstanceRouter } from "xpresser";

const router = getInstanceRouter();

router
  .path("/client/", () => {
    router.post("@makeWave");
  })
  .controller("Wave");

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

  .middlewares(["Auth.validateAuth"]);
