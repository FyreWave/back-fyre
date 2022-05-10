import Joi from "joi";

export = {
  allWavesValidator(body: any) {
    const schema = Joi.object().keys({
      reference: Joi.string().required()
    });

    const { error, value } = schema.validate(body);
    if (error) {
      throw error.details;
    }

    return value;
  },

  makeWavesValidator(body: any) {
    const schema = Joi.object().keys({
      waveName: Joi.string().required(),
      waveDescription: Joi.string().required(),
      waveType: Joi.string().default("group").required(),
      dueDate: Joi.date().required(),
      targetAmount: Joi.number().required(),
      slug: Joi.string().optional()
    });

    const { error, value } = schema.validate(body);
    if (error) {
      throw error.details;
    }

    return { error, value };
  }
};
