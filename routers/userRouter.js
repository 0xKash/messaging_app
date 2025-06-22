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

//

const userRouter = Router();

userRouter.get("/", isAuth, getUserBySearch);
userRouter.post("/", validateUser, postUser);

userRouter.post("/login", validateUser, loginUser);

// DEV ROUTES

userRouter.put("/", getAllUsers);
userRouter.delete("/", isAuth, deleteAllUsers);

module.exports = userRouter;
