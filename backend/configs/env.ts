import { Env } from "@xpresser/env";

import path = require("path");

const pathToEnv = path.resolve(
  __filename.includes(".js") ? `${__dirname}/../../../.env` : `${__dirname}/../../.env`
);

export const env = Env(".env", {
  NODE_ENV: Env.is.enum(["development", "production"]),
  APP_NAME: Env.is.string(),
  APP_PORT: Env.optional.number(5300),
  APP_DOMAIN: Env.is.string(),
  MONGO_SERVER: Env.is.string("mongodb://127.0.0.1:27017"),
  APP_URL: Env.is.string(),
  PUBLIC_PATH: Env.is.string(),
  DB_NAME: Env.optional.string("frye"),
  DB_SERVER: Env.optional.string("mongodb://127.0.0.1:27017"),
  SESSION_SECRET: Env.is.string(),
  FLW_SECRET_HASH: Env.is.string()

  /*
        SECRET_KEY: Env.is.string(),
     ADMIN_EMAIL: Env.is.string(),
        ADMIN_PASSWORD: Env.is.string(),
        SMTP_HOST: Env.is.string(),
        SMTP_PORT: Env.is.string(),
        SMTP_USERNAME: Env.is.string(),
        SMTP_PASSWORD: Env.is.string(),
        SMTP_ENCRYPTION: Env.is.string(),*/
});

export const isDev = env.NODE_ENV === "development";
