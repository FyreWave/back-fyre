import { getInstanceRouter } from "xpresser";

const router = getInstanceRouter();



router
  .path("/client/", () => {
    router.get("@ping");
  })
  .controller("App")


router
    .path("/client/", () => {
        router.post("@makeWave")
    })
    .controller("Wave")

