import { Request } from "express";
import { IUser } from "./users";

export interface ModifyRequest extends Request {
  user: IUser;
}
