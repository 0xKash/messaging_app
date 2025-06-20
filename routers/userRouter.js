const { Router } = require("express");
const { testController } = require("../controllers/userController");

//

const userRouter = Router();

userRouter.get("/", testController);

module.exports = userRouter;
