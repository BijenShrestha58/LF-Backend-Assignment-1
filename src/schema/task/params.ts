import Joi from "joi";

export const taskParamsSchema = Joi.object({
  id: Joi.number().required().messages({
    "number.base": "Id must be a number",
  }),
});
