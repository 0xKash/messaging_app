const { Router } = require("express");
const {
  testController,
  postUser,
  loginUser,
  deleteAllUsers,
  getAllUsers,
} = require("../controllers/userController");
const { validateUser } = require("../validators/users");
const isAuth = require("../lib/authMiddlewares");

//

const userRouter = Router();

userRouter.get("/", isAuth, getAllUsers);
userRouter.post("/", validateUser, postUser);

userRouter.delete("/", deleteAllUsers);

userRouter.post("/login", validateUser, loginUser);

module.exports = userRouter;
