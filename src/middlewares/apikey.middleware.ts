import { NextFunction, Request, Response } from "express";
import { HttpCode, HttpErrorResponse } from "../helpers";
import apiKeys from "../json/apikey.json";
import { IAPIKey } from "../interfaces";

/* API key checker middleware */
export const ValidXAPIKey = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const key = req.headers["x-api-key"];

    /* Header validation */
    if (!key) {
      return res.status(HttpCode.NOT_FOUND).json(
        await HttpErrorResponse({
          status: false,
          errors: [
            {
              field: "x-api-key",
              message: "API key is required.",
            },
          ],
        })
      );
    }

    /* Match key with JSON keys */
    const isMatchedKey = await apiKeys.find(
      (item: IAPIKey) => item.key === key
    );
    if (!isMatchedKey) {
      return res.status(HttpCode.NOT_FOUND).json(
        await HttpErrorResponse({
          status: false,
          errors: [
            {
              field: "x-api-key",
              message: "API key isn't correct.",
            },
          ],
        })
      );
    }

    next();
  } catch (error: any) {
    if (error) {
      res.status(HttpCode.INTERNAL_SERVER_ERROR).json(
        await HttpErrorResponse({
          status: false,
          errors: [
            {
              field: "server-error",
              message: "Internal server error.",
            },
          ],
        })
      );
    }
  }
};
