import Joi from "joi";

export const getUserQuerySchema = Joi.object({
  q: Joi.string().optional(),

  page: Joi.number().optional().messages({
    "number.base": "Page must be a number",
  }),
}).options({
  stripUnknown: true,
});
