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

router.get("/", authenticate, getTasksByUserId);

router.post("/", authenticate, createTask);

router.put("/:id", authenticate, updateTask);

router.delete("/:id", authenticate, deleteTask);

export default router;
