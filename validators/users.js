const { body } = require("express-validator");
const { validateResult } = require("../lib/validateMiddleware");

const validateUser = [
  body("username")
    .exists()
    .notEmpty()
    .isLength({ min: 1, max: 10 })
    .withMessage("Username must be between 1 and 10 characters"),
  body("password")
    .exists()
    .notEmpty()
    .isLength({ min: 3, max: 30 })
    .withMessage("Password must be between 3 and 30 characters"),

  (req, res, next) => {
    validateResult(req, res, next);
  },
];

module.exports = { validateUser };
