import { Router } from "express";
import { adminRouter } from "./admin";
import { userRouter } from "./user";

export const routers: Router = Router();

routers.use("/admin", adminRouter);
routers.use("/user", userRouter);
