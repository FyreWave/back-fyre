import AbolishRoutes from "@xpresser/abolish/dist/AbolishRoutes";

const rules = new AbolishRoutes();

// Custom dictionary to reduce redundancy
const is = {
    Name: "minLength:2|maxLength:20",
    Email: "required|string|string:toLowerCase|email",
    Password: "minLength:6|maxLength:250",
};

/**
 * -----------------------------------------------------------------------------
 * ========================== Auth Routes ================================
 * -----------------------------------------------------------------------------
 */


rules.post("Auth@register", {
    "*": "required|string", // wildcard
    country: "minLength:2|maxLength:2",
    firstName: is.Name,
    lastName: is.Name,
    email: [is.Email, "!EmailBelongsToUser"],
    password: is.Password,
    mobile: "minLength:6|maxLength:15" // will add a proper validation rule later.
});





export = rules;
