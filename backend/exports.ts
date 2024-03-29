import { getInstance } from "xpresser";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const slugify = require("slugify");

export const $ = getInstance();

// eslint-disable-next-line @typescript-eslint/no-var-requires
const jwt = require("jsonwebtoken");

export const maxAge = 3 * 24 * 60 * 60;

export const createToken = (id: any) => {
  return jwt.sign({ id }, "actionfilm", {
    expiresIn: maxAge
  });
};

export const slugifyTitle = (title: string) => {
  const shortId = $.helpers.randomStr(6);
  return slugify(`${title}-${shortId}`, {
    replacement: "-", // replace spaces with replacement
    remove: null, // regex to remove characters
    lower: true // result in lower case
  });
};
