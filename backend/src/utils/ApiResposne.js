const ApiResponse = (res, statusCode, data, message) => {
  return res.status(statusCode).json({
    statusCode,
    data,
    message,
  });
};

export default ApiResponse;
