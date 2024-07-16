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
import { updateUserBodySchema } from "../schema/user/updateUser";
import { userParamsSchema } from "../schema/user/params";

const router = express();

router.get(
  "/",
  authenticate,
  authorize("admin"),
  validateReqQuery(getUserQuerySchema),
  getUsers
);

router.get(
  "/:id",
  authenticate,
  authorize("admin"),
  validateReqParams(userParamsSchema),
  getUserById
);

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
  validateReqParams(userParamsSchema),
  validateReqBody(updateUserBodySchema),
  updateUser
);

router.delete(
  "/:id",
  authenticate,
  authorize("admin"),
  validateReqParams(userParamsSchema),
  deleteUser
);

export default router;
