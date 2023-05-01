import { NextFunction, Request, Response } from "express";
import { IUser } from "../types/users";
import ErrorHandler from "../utils/errorHandler";
import userModel from "../models/users";
import bookModel from "../models/books";
import { IBook } from "../types/books";

export const addUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name, number } = req.body as IUser;
  if (!(name || number)) {
    return next(new ErrorHandler().notAccept("all fields are required"));
  }

  try {
    const user = await userModel.create({ name, number });
    res.status(201).json({ success: true, user });
  } catch (err: any) {
    return next(new ErrorHandler().serverError(err));
  }
};

export const getUserWithBookCount = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const books: IBook[] = await bookModel.find();
    const users: IUser[] = await userModel.find();

    const usersWithCount = users.map((user) => {
      const obj: {
        gyanGanga: number;
        jeeneKiRah: number;
        total: number;
        [key: string]: number;
      } = {
        gyanGanga: 0,
        jeeneKiRah: 0,
        total: 0,
      };

      const filterAllBookOfSingleUser: IBook[] = books.filter(
        (book) => book.userId === user._id
      );
      const totalBookCount = filterAllBookOfSingleUser.forEach((book) => {
        for (const key in obj) {
          const countSingleBook = book.books.reduce((total, item) => {
            if (item.name === key) {
              return total + Number(item.sell);
            }
            return 0;
          }, 0);
          obj[key] = obj[key] + countSingleBook;
        }
      });

      return {
        _id: user._id,
        name: user.name,
        number: user.number,
        password: user.password,
        role: user.role,
        gyanGanga: obj.gyanGanga,
        jeeneKiRah: obj.jeeneKiRah,
        total: obj.total,
      };
    });

    res.status(200).json({ success: true, users: usersWithCount });
  } catch (err: any) {
    return next(new ErrorHandler().serverError(err));
  }
};

export const getUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await userModel.findById(req.params.id);
    res.status(200).json({ success: true, user });
  } catch (err: any) {
    return next(new ErrorHandler().serverError(err));
  }
};

export const getMe = (req: Request, res: Response, next: NextFunction) => {
  try {
    console.log("user", req.user)
    res.status(200).json({ success: true, user: req.user });
  } catch (err: any) {
    return next(new ErrorHandler().serverError(err));
  }
};

export const updateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const updatedUser = await userModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );
    res.status(200).json({ success: true, user: updatedUser });
  } catch (err: any) {
    return next(new ErrorHandler().serverError(err));
  }
};

export const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await userModel.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true });
  } catch (err: any) {
    return next(new ErrorHandler().serverError(err));
  }
};
