import { NextFunction, Request, Response } from "express";
import { HttpCode, HttpSuccessResponse } from "../../helpers";

/** list of resources */
export const index = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.status(HttpCode.OK).json(
      await HttpSuccessResponse({
        status: true,
        message: "List of resources.",
        data: [],
      })
    );
  } catch (error: any) {
    console.log(error);
    next(error);
  }
};
