// imports
const { Router } = require("express");
const { validateUser } = require("../validators/users");
const isAuth = require("../lib/authMiddlewares");
const {
  getUserById,
  postUser,
  getUserChats,
  loginUser,
  updateAvatar,
  getUserBySearch,
} = require("../controllers/userController");

// userRouter setup
const userRouter = Router();

userRouter.get("/", isAuth, getUserBySearch);
userRouter.post("/", validateUser, postUser);

userRouter.get("/:userId", isAuth, getUserById);
userRouter.get("/:userId/chats", isAuth, getUserChats);

userRouter.post("/login", validateUser, loginUser);

userRouter.post("/avatar", updateAvatar);

// exports
module.exports = userRouter;
