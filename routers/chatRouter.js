const { Router } = require("express");
const { postChat, getUserChats } = require("../controllers/chatController");
const isAuth = require("../lib/authMiddlewares");

//

const chatRouter = Router();

chatRouter.get("/", isAuth, getUserChats);
chatRouter.post("/", isAuth, postChat);

module.exports = chatRouter;
