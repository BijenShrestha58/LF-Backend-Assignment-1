import express from "express";
import userRouter from "./user";
import taskRouter from "./task";

const router = express();

router.use("/users",userRouter);
router.use("/tasks",taskRouter);

export default router;