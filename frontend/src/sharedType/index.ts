export interface IUser {
  id: string;
  username: string;
  email: string;
}

export interface IApiresponse<T> {
  statusCode: number;
  message: string;
  data: T;
}

export interface IErrorResponse {
  statusCode: number;
  message: string;
}
