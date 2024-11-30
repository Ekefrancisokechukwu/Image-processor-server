const errorHandler = (err, req, res, next) => {
  const customError = {
    message: err.message || "Something went wrong",
    statusCode: err.status || 500,
  };

  if (err.name === "ValidationError" && err.errors) {
    customError.message = Object.values(err.errors)
      .map((item) => item.message)
      .join(",");
    customError.statusCode = 400;
  }

  res.status(customError.statusCode).send({ message: customError.message });
};

module.exports = errorHandler;
