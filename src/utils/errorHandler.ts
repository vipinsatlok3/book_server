class ErrorHandler extends Error {
  status: number | undefined;

  constructor(message?: string, status?: number) {
    super(message);
    this.status = status;
  }

  notFound(message?: string) {
    this.message = message || "not found";
    this.status = 404;
    return this;
  }

  unAuthrized(message?: string) {
    this.message = message || "unauthorized";
    this.status = 401;
    return this;
  }

  notAccept(message?: string) {
    this.message = message || "not accept";
    this.status = 403;
    return this;
  }

  serverError(message?: string) {
    this.message = message || "server error";
    this.status = 500;
    return this;
  }
}

export default ErrorHandler;
