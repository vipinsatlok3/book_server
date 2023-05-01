"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function error(error, req, res, next) {
    const message = error.message || "server error";
    const status = error.status || 500;
    res
        .status(status)
        .json({
        success: false,
        error,
        message,
        status
    });
}
exports.default = error;
