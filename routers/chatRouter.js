// imports
const { Router } = require("express");
const isAuth = require("../lib/authMiddlewares");
const {
  getChatById,
  postChat,
  postMessage,
} = require("../controllers/chatController");

// chatRouter setup
const chatRouter = Router();

chatRouter.post("/:targetId", isAuth, postChat);

chatRouter.get("/:chatId", isAuth, getChatById);

chatRouter.post("/:chatId/messages", isAuth, postMessage);

// exports
module.exports = chatRouter;
