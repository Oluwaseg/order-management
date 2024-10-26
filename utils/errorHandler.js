export class ErrorHandler extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.success = false;

    // Capture the stack trace
    Error.captureStackTrace(this, this.constructor);
  }
}
