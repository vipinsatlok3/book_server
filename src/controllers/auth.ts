import { NextFunction, Request, Response } from "express";
import { IUser } from "../types/users";
import ErrorHandler from "../utils/errorHandler";
import userModel from "../models/users";
import { sign, verify } from "jsonwebtoken";
import { JWT_SECRET } from "../envVariables";

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { password, number } = req.body as IUser;
  if (!(number || password)) {
    return next(new ErrorHandler().notAccept("all fields are required"));
  }

  try {
    const user = await userModel.findOne({ number, password });
    console.log({ user });
    if (!user) {
      return next(new ErrorHandler().notAccept("invalid credentials"));
    }

    const token = sign({ id: user._id }, JWT_SECRET as string, {
      expiresIn: "365d",
    });

    console.log({ token });

    res
      .status(200)
      .setHeader("Authorization", `Bearer ${token}`)
      .json({ token });
  } catch (err: any) {
    console.log("call error");
    return new ErrorHandler().serverError(err);
  }
};

export const isAuthenticated = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return new ErrorHandler().notAccept("no token provided");
  }

  const decoded = (await verify(token, JWT_SECRET as string)) as IUser;

  try {
    const user = (await userModel.findById(decoded._id)) as IUser;
    if (!user) {
      return new ErrorHandler().unAuthrized();
    }


    req.user = user;
    next();
  } catch (err: any) {
    return new ErrorHandler().serverError(err);
  }
};

export const isAdmin = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.user.role !== "admin") {
    return new ErrorHandler().unAuthrized("this user is not admin");
  }
  next();
};
