import Mongoose from "mongoose";
import { hash, compare } from "bcrypt";
import { sign as jwtSign, verify as jwtVerify } from "jsonwebtoken";
import {
  IJwtPayload,
  IHttpErrorResponse,
  IHttpSuccessResponse,
  IHeader,
} from "../interfaces/helper.interface";

/* Valid mongoose ID */
export const validMongooseId = ({
  id,
}: {
  id: Mongoose.Types.ObjectId | string;
}) => {
  return Mongoose.Types.ObjectId.isValid(id);
};

/* Valid email */
export const isValidEmail = ({ email }: { email: string }) => {
  const re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
};

/* Password encrypt */
export const encryptPassword = async ({
  plainPassword,
}: {
  plainPassword: string;
}): Promise<string> => {
  return await hash(plainPassword, 10);
};

/* Compare encrypted password */
export const comparePassword = async ({
  plainPassword,
  hashPassword,
}: {
  plainPassword: string;
  hashPassword: string;
}): Promise<boolean> => {
  return await compare(plainPassword, hashPassword);
};

/* generate access token */
export const accessToken = async (payload: IJwtPayload): Promise<string> => {
  const JWT_SECRET: any = process.env.JWT_SECRET;
  const token = await jwtSign(
    {
      id: payload.id,
      name: payload.name,
      role: payload.role,
    },
    JWT_SECRET,
    { expiresIn: "1d" }
  );

  return token;
};

/* Verify access token */
export const verifyAccessToken = async (
  token: string
): Promise<IJwtPayload> => {
  const JWT_SECRET: any = process.env.JWT_SECRET;
  const decodeToken: any = await jwtVerify(token, JWT_SECRET);

  return decodeToken;
};

/* Http error response */
export const HttpErrorResponse = async (
  payload: IHttpErrorResponse
): Promise<IHttpErrorResponse> => {
  return {
    status: payload.status,
    errors: [...payload.errors],
  };
};

/* Http success response */
export const HttpSuccessResponse = async (
  payload: IHttpSuccessResponse
): Promise<IHttpSuccessResponse> => {
  return {
    status: payload.status,
    message: payload.message,
    token: payload.token,
    data: payload.data,
    paginate: payload.paginate,
  };
};

/** Generate API headers */
export const getHeader = async ({
  api_key,
  token,
}: {
  api_key: string;
  token: string;
}): Promise<IHeader> => {
  const header = {
    headers: {
      Authorization: token,
      api_key: api_key,
    },
  };

  return header;
};

/** Http status codes */
export enum HttpCode {
  OK = 200,
  CREATED = 201,
  NO_CONTENT = 204,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  NOT_FOUND = 404,
  EXIST = 409,
  REQUIRED = 422,
  INTERNAL_SERVER_ERROR = 500,
}
