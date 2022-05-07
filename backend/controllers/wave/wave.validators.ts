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
  }
};

/*
waveName: "required|string",
    waveDescription: "required|string",
    dueDate: "required|date",
    targetAmount: skipIfNotDefined("required|number"),
    slug: skipIfNotDefined("required|string")*/
