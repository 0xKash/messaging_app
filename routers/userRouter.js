const { Router } = require("express");
const {
  testController,
  postUser,
  loginUser,
  deleteAllUsers,
  getAllUsers,
  getUserByUsername,
} = require("../controllers/userController");
const { validateUser } = require("../validators/users");
const isAuth = require("../lib/authMiddlewares");

//

const userRouter = Router();

userRouter.get("/", isAuth, getUserByUsername);
userRouter.post("/", validateUser, postUser);
userRouter.delete("/", isAuth, deleteAllUsers);

userRouter.post("/login", validateUser, loginUser);

module.exports = userRouter;
