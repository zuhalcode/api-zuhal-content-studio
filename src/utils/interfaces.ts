import { Request } from "express";

interface IUserToken {
  id: string;
  email?: string;
}

interface IReqUser extends Request {
  user?: IUserToken;
}

export type { IUserToken, IReqUser };
