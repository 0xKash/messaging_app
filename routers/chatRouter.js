const { Router } = require("express");
const {
  postChat,
  getUserChats,
  getChatMessages,
} = require("../controllers/chatController");
const isAuth = require("../lib/authMiddlewares");

//

const chatRouter = Router();

chatRouter.get("/", isAuth, getUserChats);
chatRouter.post("/", isAuth, postChat);

chatRouter.get("/messages", isAuth, getChatMessages);

module.exports = chatRouter;
