const { Router } = require("express");
const { postChat, getChats } = require("../controllers/chatController");
const isAuth = require("../lib/authMiddlewares");

//

const chatRouter = Router();

chatRouter.get("/", isAuth, getChats);
chatRouter.post("/", isAuth, postChat);

module.exports = chatRouter;
