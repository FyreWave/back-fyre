import { init } from "xpresser";
/**
 * Boot Xpresser with your config
 *
 * Get config from config.ts
 * See https://xpresserjs.com/configuration/
 */
import config from "./config";
import { Options } from "xpresser/types";

/**
 * Set repl options.
 */
const options: Options = global.hasOwnProperty("IS_XPRESSER_REPL")
    ? { requireOnly: true, isConsole: true }
    : {};

// Start Xpresser
const $ = init(config, options);

// Initialize Typescript for this project.
$.initializeTypescript(__filename);

const moment = $.modules.moment();

// Export Dollar Sign
export { $, moment };
