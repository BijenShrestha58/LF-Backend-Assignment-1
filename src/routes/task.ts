import express from "express";
import {
  createTask,
  deleteTask,
  getTaskById,
  getTasks,
  getTasksByUserId,
  updateTask,
} from "../controller/task";
import { authenticate, authorize } from "../middlewares/auth";
import { validateReqBody, validateReqParams } from "../middlewares/validator";
import { createTaskBodySchema } from "../schema/task/createTask";
import { updateTaskBodySchema } from "../schema/task/updateTask";
import { taskParamsSchema } from "../schema/task/params";

const router = express();

router.get("/all", authenticate, authorize("admin"), getTasks);

router.get(
  "/:id",
  authenticate,
  authorize("admin"),
  validateReqParams(taskParamsSchema),
  getTaskById
);

router.get("/", authenticate, authorize("user"), getTasksByUserId);

router.post(
  "/",
  authenticate,
  authorize("user"),
  validateReqBody(createTaskBodySchema),
  createTask
);

router.put(
  "/:id",
  authenticate,
  authorize("user"),
  validateReqParams(taskParamsSchema),
  validateReqBody(updateTaskBodySchema),
  updateTask
);

router.delete(
  "/:id",
  authenticate,
  authorize("user"),
  validateReqParams(taskParamsSchema),
  deleteTask
);

export default router;
