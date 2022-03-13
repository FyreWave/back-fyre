import path = require("path");
const env = require("./env");
const isDev = env.NODE_ENV === "development";
const base = path.resolve(`${__dirname}/../../`);

/**
 * Your Config File.
 * See https://xpresserjs.com/configuration/
 */
export = {
  // name of app
  name: env.APP_NAME,
  url: env. APP_URL,
  // app environment
  env: env.NODE_ENV,

  /**
   * By default xpresser sets this for you.
   */
  server: {
    domain: env.APP_DOMAIN,

    // Server Port
    port: env.APP_PORT,
    ssl: {
      enabled: env["SSL"],
      files: {
        cert: env["SSL_CERT"],
        key: env["SSL_KEY"],
      },
    },

    use: {
      cors: true,
      flash: true,
      helmet: false,
    },
    router: {
      pathCase: "kebab",
    },
  },

  /**
   * Path settings.
   */
  // Connection Config
  mongodb: {
    url: env.MONGO_SERVER,
    database: env.DB_NAME,
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
  },
  paths: {
    /**
     * Base Folder
     * Where this app is called from.
     *
     * Best value for this is: __dirname
     */
    base,
    public: path.resolve(env.PUBLIC_PATH),
    storage: "storage",

    /**
     * Point routes file to routes.ts
     */
    routesFile: "backend://routes.ts",
  },
  session: {
    startOnBoot: false,
    secret: env.sessionSecret,
    cookie: {
      path: "/",
      domain: env.APP_NAME,
      maxAge: 5000 * 60 * 24,
    },
    resave: true,
    saveUninitialized: true,
  },
};
