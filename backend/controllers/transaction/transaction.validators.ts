import Joi from "joi";

export = {
  paymentCallbackValidator: function (body: any) {
    const schema = Joi.object().keys({
      reference: Joi.string().required()
    });

    const { error, value } = schema.validate(body);
    if (error) {
      throw error.details;
    }

    return value;
  }
};
