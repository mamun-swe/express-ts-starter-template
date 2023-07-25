import express from "express";
import * as demoController from "../../controllers/admin/demo.controller";

export const demoRouters = express.Router();

demoRouters.get("/", demoController.index);
