class ErrorHandler extends Error {
  constructor(message, statusCode, couse) {
    super();
    this.message = message;
    this.couse = couse;
    this.statusCode = statusCode;
  }
}

export default ErrorHandler;
