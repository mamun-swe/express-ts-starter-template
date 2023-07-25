import { NextFunction, Request, Response } from "express";
import { HttpCode, HttpErrorResponse } from "../helpers";

export const ApiErrorHandeller = async (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (error.status === 404) {
    return res.status(HttpCode.NOT_FOUND).json(
      await HttpErrorResponse({
        status: false,
        errors: [
          {
            field: "not-found",
            message: error.message,
          },
        ],
      })
    );
  }

  if (error.status === 400) {
    return res.status(HttpCode.BAD_REQUEST).json(
      await HttpErrorResponse({
        status: false,
        errors: [
          {
            field: "bad-request",
            message: "Bad request server denied.",
          },
        ],
      })
    );
  }

  if (error.status === 401) {
    return res.status(HttpCode.UNAUTHORIZED).json(
      await HttpErrorResponse({
        status: false,
        errors: [
          {
            field: "permission",
            message: "You have no permission to access.",
          },
        ],
      })
    );
  }

  return res.status(HttpCode.INTERNAL_SERVER_ERROR).json(
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
};
