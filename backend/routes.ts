import { getInstanceRouter } from "xpresser";
// import env from "./configs/env";
import path from "path";
import { env } from "./configs/env";

/**
 * See https://xpresserjs.com/router/
 */
const Router = getInstanceRouter();

/**
 * Url: "/" points to AppController@index
 * The index method of the controller.
 */

Router.path("/api", () => {
  require("./routes/client.routes");
  require("./controllers/transaction/transaction.router");
  require("./controllers/wave/wave.router");
  require("./controllers/auth/auth.router");
});

Router.path("/api", () => {
  require("./routes/link.routes");
});

// Api Route

Router.routesAfterPlugins = () => {
  Router.any("/api/*", "AppController@api404");
  // console.log(path.resolve(`${env.publicPath}/index.html`));

  Router.sendFile("/*", path.resolve(`${env.PUBLIC_PATH}/index.html`));
};
