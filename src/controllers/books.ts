import { NextFunction, Request, Response } from "express";
import { IBook } from "../types/books";
import ErrorHandler from "../utils/errorHandler";
import bookModel from "../models/books";

export const addBook = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { place, date, books } = req.body as IBook;
  if (!place) {
    return next(new ErrorHandler().notAccept("place is required"));
  }

  try {
    const book = await bookModel.create({ place, userId: req.user._id, date, books });
    res.status(201).json({ success: true, book });
  } catch (err: any) {
    return next(new ErrorHandler().serverError(err));
  }
};

// for admin
export const getBooks = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const books = await bookModel.find();
    res.status(200).json({ success: true, books });
  } catch (err: any) {
    return next(new ErrorHandler().serverError(err));
  }
};

export const getBook = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const book = await bookModel.findById(req.params.id);
    res.status(200).json({ success: true, book });
  } catch (err: any) {
    return next(new ErrorHandler().serverError(err));
  }
};

export const getAllBookOfAnyUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const books = await bookModel.find({ userId: req.user._id });
    res.status(200).json({ success: true, books });
  } catch (err: any) {
    return next(new ErrorHandler().serverError(err));
  }
};

export const updateBook = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const updatedBook = await bookModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );
    res.status(200).json({ success: true, book: updatedBook });
  } catch (err: any) {
    return next(new ErrorHandler().serverError(err));
  }
};

export const deleteBook = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await bookModel.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true });
  } catch (err: any) {
    return next(new ErrorHandler().serverError(err));
  }
};
