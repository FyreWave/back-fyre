import { getInstanceRouter } from "xpresser";

const router = getInstanceRouter();



router
  .path("/client/", () => {
    router.get("@ping");
    router.post("@makeWave")
  })
  .controller("App")

