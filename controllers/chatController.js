// imports
const prisma = require("../db/queries");
const {
  CustomBadRequestError,
  CustomNotFoundError,
} = require("../errors/errors");

exports.getChatById = async (req, res) => {
  if (!req.params.chatId)
    // Checks if query is missing
    throw new CustomBadRequestError(
      "Necessary input missing",
      "chatId query parameter is missing",
      "Make sure the query is correctly written and not empty",
      req.originalUrl
    );

  const chat = await prisma.getChat(req.params.chatId);

  if (!chat)
    throw new CustomNotFoundError(
      "Chat not found",
      "The chatId does not belong to any existent user",
      "Try making sure it is correct and the user exists",
      req.originalUrl
    );

  res.json({
    status: "success",
    data: chat,
  });
};

exports.postChat = async (req, res) => {
  if (!req.params.targetId)
    // Checks if query is missing
    throw new CustomBadRequestError(
      "Necessary input missing",
      "Target ID query parameter is missing",
      "Make sure the query is correctly written and not empty",
      req.originalUrl
    );

  const chat = await prisma.createChat(req.user.id, req.params.targetId);

  res.json({
    status: "success",
    data: chat,
  });
};

exports.postMessage = async (req, res) => {
  const message = await prisma.createMessage(
    req.body.content,
    req.user.id,
    req.params.chatId
  );

  res.json({
    status: "success",
    data: message,
  });
};
