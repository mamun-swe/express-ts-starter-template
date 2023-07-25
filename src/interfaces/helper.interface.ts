export interface IJwtPayload {
  id: string;
  name: string;
  role: string;
}

type ErrorType = {
  field: string;
  message: string;
};

export interface IHttpErrorResponse {
  status: boolean;
  errors: ErrorType[];
}

export interface IHttpSuccessResponse {
  status: boolean;
  message: string;
  token?: string;
  data?: any;
  paginate?: any;
}

export interface IHeader {
  headers: {
    Authorization: string;
    api_key: string;
  };
}
