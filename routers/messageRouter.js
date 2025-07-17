// imports
const { Router } = require("express");
const { postMessage } = require("../controllers/messageController");

// messageRouter setup
const messageRouter = Router();

messageRouter.post("/", postMessage);

// exports
module.exports = messageRouter;
