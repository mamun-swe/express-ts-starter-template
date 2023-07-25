import express, { Express, NextFunction, Response, Request } from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import compression from "compression";
dotenv.config();
import { routers } from "./routes";
import { ApiErrorHandeller } from "./middlewares/apierror.middleware";
import { ValidXAPIKey } from "./middlewares/apikey.middleware";
import { HttpCode } from "./helpers";

export const app: Express = express();
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(ValidXAPIKey);

/* Root route */
app.get("/", (req: Request, res: Response, next: NextFunction) => {
  res.send("Welcome to authentication service. 😛😛😛");
});

/* Integrate API routes */
app.use("/api/v1", routers);

/* Handelling 404 route */
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(HttpCode.NOT_FOUND).json({
    status: false,
    errors: [{ field: "server", message: "Sorry, Route not found." }],
  });
});

/* Error handelling middleware registration */
app.use(ApiErrorHandeller);
