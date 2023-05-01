import { Response, Request, NextFunction } from "express";
import ErrorHandler from "../utils/errorHandler";

export default function error(error: ErrorHandler, req: Request, res: Response, next: NextFunction) {

    const message = error.message || "server error";
    const status = error.status || 500;

    res
        .status(status)
        .json({
            success: false,
            error,
            message,
            status
        })
}