import { Router } from "express";
import { demoRouters } from "./demo.routes";

export const adminRouter: Router = Router();

adminRouter.use("/demo", demoRouters);
