import { getInstance } from "xpresser";

export const $ = getInstance();

const jwt = require("jsonwebtoken");

export const maxAge = 3 * 24 * 60 * 60;

export const createToken = (id: any) => {
  return jwt.sign({ id }, "actionfilm", {
    expiresIn: maxAge
  });
};
