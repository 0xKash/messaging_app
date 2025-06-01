const { Router } = require("express");

//

const userRouter = Router();

userRouter.get("/", (req, res) => res.send("Ok"));

module.exports = userRouter;
