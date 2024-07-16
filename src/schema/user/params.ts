import Joi from "joi";

export const userParamsSchema = Joi.object({
  id: Joi.string().pattern(/^\d+$/).required().messages({
    "string.pattern.base": "Id must be a number",
    "string.empty": "Id is required",
  }),
});
