import envLoader = require("@xpresser/env");
import path = require("path");

const pathToEnv = path.resolve(
  __filename.includes(".js")
    ? `${__dirname}/../../../.env`
    : `${__dirname}/../../.env`
);

export = envLoader(pathToEnv, {
  castBoolean: true,
  required: [
    "NODE_ENV",
    "APP_NAME",
    "APP_PORT",
      "APP_URL",
    "MONGO_SERVER",
    "DB_NAME",
    "PUBLIC_PATH",
  ],
}) as {
  NODE_ENV: string;
    APP_NAME: string;
    APP_DOMAIN: string;
    APP_PORT: string;
    MONGO_SERVER: string;
    DB_NAME: string;
    APP_URL: string;
    PUBLIC_PATH: string;
};
