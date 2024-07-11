import express from "express";
import {
  createUser,
  deleteUser,
  getUsers,
  getUserById,
  updateUser,
} from "../controller/user";
import { authenticate, authorize } from "../middlewares/auth";
import { validateReqBody, validateReqQuery } from "../middlewares/validator";
import { createUserBodySchema, getUserQuerySchema } from "../schema/user";

const router = express();

router.get(
  "/",
  authenticate,
  authorize("admin"),
  validateReqQuery(getUserQuerySchema),
  getUsers
);

router.get("/:id", authenticate, authorize("admin"), getUserById);

router.post(
  "/",
  authenticate,
  authorize("admin"),
  validateReqBody(createUserBodySchema),
  createUser
);

router.put("/:id", authenticate, authorize("admin"), updateUser);

router.delete("/:id", authenticate, authorize("admin"), deleteUser);

export default router;
