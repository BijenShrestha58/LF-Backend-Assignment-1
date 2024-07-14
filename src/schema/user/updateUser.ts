import Joi from "joi";

export const updateUserBodySchema = Joi.object({
  name: Joi.string().optional(),
  email: Joi.string().email().optional().messages({
    "string.email": "Email must be a valid format",
  }),
  password: Joi.string()
    .optional()
    .min(8)
    .messages({
      "string.min": "Password must be atleast 8 characters long",
      "password.uppercase":
        "Password must have atleast one uppercase character",
      "password.lowercase":
        "Password must have atleast one lowercase character",
      "password.special": "Password must have atleast one special character",
    })
    .custom((value, helpers) => {
      if (!/[A-Z]/.test(value)) {
        return helpers.error("password.uppercase");
      }

      if (!/[a-z]/.test(value)) {
        return helpers.error("password.lowercase");
      }

      if (!/[!@#$%]/.test(value)) {
        return helpers.error("password.special");
      }
      return value;
    }),
  permissions: Joi.optional(),
});

export const updateUserParamsSchema = Joi.object({
  id: Joi.string().required().messages({
    "any.required": "Id is required",
  }),
});
