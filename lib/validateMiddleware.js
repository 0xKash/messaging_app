// imports
const { validationResult } = require("express-validator");

const validateResult = (req, res, next) => {
  try {
    // Function from express-validator import
    validationResult(req).throw();
    return next();
  } catch (err) {
    res.status(403);
    res.send({ status: "error", errors: err.array() }); // send errors
  }
};

// exports
module.exports = { validateResult };
