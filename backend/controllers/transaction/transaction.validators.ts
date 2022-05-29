import Joi from "joi";

export = {
  createTransactionValidator: function (body: any) {
    const schema = Joi.object()
      .keys({
        _id: Joi.string().required() //waveId
      })
      .unknown(true);

    const { value, error } = schema.validate(body);
    if (error) {
      throw error.details;
    }

    return value;
  },
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
