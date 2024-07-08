import express from "express";
import {
  createTask,
  deleteTask,
  getTaskById,
  getTasks,
  getTasksByUserId,
  updateTask,
} from "../controller/task";

const router = express();

router.get("/", getTasks);

router.get("/:id", getTaskById);

router.get("/user/:id", getTasksByUserId);

router.post("/", createTask);

router.put("/:id", updateTask);

router.delete("/:id", deleteTask);

export default router;
