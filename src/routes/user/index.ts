import { Router } from "express";
import { demoRouters } from "./demo.routes";

export const userRouter: Router = Router();

userRouter.use("/demo", demoRouters);
