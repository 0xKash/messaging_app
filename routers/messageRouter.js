const { Router } = require("express");
const { postMessage } = require("../controllers/messageController");

//

const messageRouter = Router();

messageRouter.post("/", postMessage);

module.exports = messageRouter;
