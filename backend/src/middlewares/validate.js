import ErrorHandler from "../utils/ErrorHandler.js";

const validate = (schema) => {
  return (req, res, next) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      const firstErrorMessage = result.error.issues[0].message;
      return res
        .status(400)
        .json(new ErrorHandler(firstErrorMessage, 400, result.error.issues));
    }
    req.body = result.data;
    next();
  };
};
export default validate;
