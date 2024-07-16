import Joi from "joi";
import { status } from "../../enums/status";

export const updateTaskBodySchema = Joi.object({
  name: Joi.string().optional(),
  status: Joi.string()
    .valid(status.TODO, status.IN_PROGRESS, status.COMPLETED)
    .optional()
    .messages({
      "any.only": `Status must be one of [${Object.values(status).join(", ")}]`,
    }),
});
