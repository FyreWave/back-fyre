import { getInstanceRouter } from "xpresser";
const router = getInstanceRouter();

router
  .path("/auth/", () => {
    router.post("@register");
    router.post("@login");
  })
  .controller("./auth/Auth");
