import Joi from "joi";
import { status } from "../../enums/status";

export const createTaskBodySchema = Joi.object({
  name: Joi.string().required().messages({
    "any.required": "Name is required",
  }),
  status: Joi.string()
    .valid(status.TODO, status.IN_PROGRESS, status.COMPLETED)
    .required()
    .messages({
      "any.required": "Status is required",
      "any.only": `Status must be one of [${Object.values(status).join(", ")}]`,
    }),
});
