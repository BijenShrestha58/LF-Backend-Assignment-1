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

const router = express();

router.get("/all", authenticate, authorize("admin"), getTasks);

router.get("/:id", authenticate, authorize("admin"), getTaskById);

router.get("/", authenticate, authorize("user"), getTasksByUserId);

router.post("/", authenticate, authorize("user"), createTask);

router.put("/:id", authenticate, authorize("user"), updateTask);

router.delete("/:id", authenticate, authorize("user"), deleteTask);

export default router;
