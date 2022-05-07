import Joi from "joi";

export = {
  loginValidator: function (body: any) {
    const schema = Joi.object().keys({
      isEmail: Joi.boolean().default(true).optional().strip(true),
      email: Joi.string().email().required(),
      password: Joi.string().min(6).required(),
      mobile: Joi.string().when("isEmail", {
        is: false,
        then: Joi.string().required()
      })
    });

    const { error, value } = schema.validate(body);

    if (error) {
      throw error;
    }
    return { error, value };
  },

  registerValidator: function (body: any) {
    const schema = Joi.object().keys({
      isEmail: Joi.boolean().default(true).required().strip(true),
      email: Joi.string().email().required(),
      password: Joi.string().min(6).required(),
      mobile: Joi.string().when("isEmail", {
        is: false,
        then: Joi.string().required()
      }),
      confirmPassword: Joi.any()
        .equal(Joi.ref("password"))
        .required()
        .strip(true)
        .label("Confirm password")
        .messages({ "any.only": "{{#label}} does not match" })
    });

    const { error, value } = schema.validate(body);

    if (error) {
      throw error.details;
    }

    return { error, value };
  }
};

/*

routes.post("AuthController@register", {
  email: skipIfNotDefined("required|email"),
  mobile: skipIfNotDefined("string|min:6"),
  password: "required|string|min:6"

  // confirmPassword: "required|string|same:password"
});

routes.post("AuthController@login", {
  email: skipIfNotDefined("required|email"),
  mobile: skipIfNotDefined("string|min:6"),
  password: "required|string|min:6"
  // confirmPassword: "required|string|same:password"
});

    */
