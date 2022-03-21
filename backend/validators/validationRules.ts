import AbolishRoutes from "@xpresser/abolish/dist/AbolishRoutes";
import rules from "./rules";
import {skipIfNotDefined, skipIfUndefined} from "abolish/src/Functions";

// ===== Initialize AbolishRoutes =====
const routes = new AbolishRoutes();

// ===== Define validation for Routes =====
// ===== Syntax =====


// ===== Example =====

// ===== Define validation for Routes =====
// ===== Syntax =====

// ===== Example =====
routes.post("AuthController@register", {
    email: skipIfNotDefined("required|email"),
    mobile: skipIfNotDefined("string|min:6",),
    password: "required|string|min:6",
    // confirmPassword: "required|string|same:password"
});

export = routes;
