// imports
const { CustomInternalServerError } = require("./errors");

const handlePrismaError = (err) => {
  switch (err.code) {
    // Unique constraint failed on the {constraint}
    case "P2002":
      throw new CustomInternalServerError(
        "Something went wrong",
        `Duplicated field value: ${err.meta.target}`
      );

    // Foreign key constraint failed on the field: {field_name}
    case "P2003":
      throw new CustomInternalServerError(
        "Something went wrong",
        `Invalid input data: ${err.meta.target}`
      );

    /* The change you are trying to make would violate the required relation '{relation_name}' between the {model_a_name} and {model_b_name} models. */
    case "P2014":
      throw new CustomInternalServerError(
        "Something went wrong",
        `Invalid ID: ${err.meta.target}`
      );

    // An operation failed because it depends on one or more records that were required but not found. {cause}
    case "P2025":
      throw new CustomInternalServerError(
        "Something went wrong",
        `Operation depends on one or more records not found ${err.meta.target}`
      );
    default:
      throw new CustomInternalServerError("Something went wrong", err.meta);
  }
};

// exports
module.exports = handlePrismaError;
