// imports
const { Router } = require("express");
const {
  postChat,
  getUserChats,
  getChatMessages,
} = require("../controllers/chatController");
const isAuth = require("../lib/authMiddlewares");

// chatRouter setup
const chatRouter = Router();

chatRouter.get("/", isAuth, getUserChats);
chatRouter.post("/", isAuth, postChat);

chatRouter.get("/messages", isAuth, getChatMessages);

// exports
module.exports = chatRouter;
