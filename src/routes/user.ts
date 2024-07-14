import express from "express";
import {
  createUser,
  deleteUser,
  getUsers,
  getUserById,
  updateUser,
} from "../controller/user";
import { authenticate, authorize } from "../middlewares/auth";
import {
  validateReqBody,
  validateReqParams,
  validateReqQuery,
} from "../middlewares/validator";
import { createUserBodySchema } from "../schema/user/createUser";
import { getUserQuerySchema } from "../schema/user/getUser";
import {
  updateUserBodySchema,
  updateUserParamsSchema,
} from "../schema/user/updateUser";

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

router.put(
  "/:id",
  authenticate,
  authorize("admin"),
  validateReqParams(updateUserParamsSchema),
  validateReqBody(updateUserBodySchema),
  updateUser
);

router.delete("/:id", authenticate, authorize("admin"), deleteUser);

export default router;
