const ApiResponse = (statusCode, data, message) => {
  return {
    statusCode,
    data,
    message,
  };
};

export default ApiResponse;
