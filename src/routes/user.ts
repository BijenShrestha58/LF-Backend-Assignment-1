import express from "express";
import {
  createUser,
  deleteUser,
  getUsers,
  getUserById,
  updateUser,
} from "../controller/user";

const router = express();

router.get("/", getUsers);

router.get("/:id", getUserById);

router.post("/", createUser);

router.put("/:id", updateUser);

router.delete("/:id", deleteUser);

export default router;
