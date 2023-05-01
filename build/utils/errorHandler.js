"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ErrorHandler extends Error {
    constructor(message, status) {
        super(message);
        this.status = status;
    }
    notFound(message) {
        this.message = message || "not found";
        this.status = 404;
        return this;
    }
    unAuthrized(message) {
        this.message = message || "unauthorized";
        this.status = 401;
        return this;
    }
    notAccept(message) {
        this.message = message || "not accept";
        this.status = 403;
        return this;
    }
    serverError(message) {
        this.message = message || "server error";
        this.status = 500;
        return this;
    }
}
exports.default = ErrorHandler;
