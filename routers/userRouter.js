// imports
const { Router } = require("express");
const {
  testController,
  postUser,
  loginUser,
  deleteAllUsers,
  getAllUsers,
  getUserBySearch,
} = require("../controllers/userController");
const { validateUser } = require("../validators/users");
const isAuth = require("../lib/authMiddlewares");

// userRouter setup
const userRouter = Router();

userRouter.get("/", isAuth, getUserBySearch);
userRouter.post("/", validateUser, postUser);

userRouter.post("/login", validateUser, loginUser);

// dev routes (only used for development purposes)
userRouter.put("/", getAllUsers);
userRouter.delete("/", isAuth, deleteAllUsers);

// exports
module.exports = userRouter;
