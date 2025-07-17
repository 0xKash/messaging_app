// imports
const prisma = require("../db/queries");
const utils = require("../lib/utils");
const {
  CustomNotFoundError,
  CustomNotAuthorizedError,
  CustomBadRequestError,
} = require("../errors/errors");

// This function checks if user's input is valid, creates a new user on db & issues a new JWT token
exports.postUser = async (req, res) => {
  const saltHash = utils.genPassword(req.body.password);
  const { salt, hash } = saltHash;

  const user = await prisma.createUser(req.body.username, hash, salt);
  const jwt = utils.issueJWT(user);

  res.json({
    status: "success",
    data: {
      user: user,
      token: jwt.token,
      expiresIn: jwt.expires,
    },
  });
};

// This function checks if user's input is valid & issues a JWT token
exports.loginUser = async (req, res) => {
  const user = await prisma.getUserByUsername(req.body.username);

  console.log(user);

  if (!user)
    throw new CustomNotFoundError(
      "User not found",
      `The user with the username ${req.body.username} does not exist`,
      "Please check if the username and password are correct",
      req.originalUrl
    );

  const isValid = utils.validPassword(req.body.password, user.hash, user.salt);

  if (isValid) {
    const tokenObject = utils.issueJWT(user);

    res.json({
      success: true,
      data: {
        user: user,
        token: tokenObject.token,
        expires: tokenObject.expires,
      },
    });
  } else {
    throw new CustomNotAuthorizedError( // Error in case the input is incorrect
      "You entered the wrong password",
      `${req.body.password} is not the correct password`,
      "Try with another password",
      req.originalUrl
    );
  }
};

exports.getUserBySearch = async (req, res) => {
  if (!req.query.username)
    throw new CustomBadRequestError(
      "Necessary input missing",
      "Username query parameter is missing",
      "Make sure the query is correctly written and not empty",
      req.originalUrl
    );

  const user = await prisma.getUsersBySearch(req.query.username);

  res.json({
    status: "success",
    data: user,
  });
};

// dev controllers (only used for development purposes)

exports.getAllUsers = async (req, res) => {
  const users = await prisma.getAllUsers(true, true);

  res.send(users);
};
