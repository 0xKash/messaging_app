const { CustomInternalServerError } = require("./errors");

const handlePrismaError = (err) => {
  switch (err.code) {
    case "P2002":
      throw new CustomInternalServerError(
        "Something went wrong",
        `Duplicated field value: ${err.meta.target}`
      );
    case "P2014":
      throw new CustomInternalServerError(
        "Something went wrong",
        `Invalid ID: ${err.meta.target}`
      );
    case "P2003":
      throw new CustomInternalServerError(
        "Something went wrong",
        `Invalid input data: ${err.meta.target}`
      );
    case "P2025":
      throw new CustomInternalServerError(
        "Something went wrong",
        `Operation depends on one or more records not found ${err.meta.target}`
      );
    default:
      throw new CustomInternalServerError("Something went wrong", err.meta);
  }
};

module.exports = handlePrismaError;
