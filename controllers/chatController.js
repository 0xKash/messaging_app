// imports
const prisma = require("../db/queries");
const {
  CustomBadRequestError,
  CustomNotFoundError,
} = require("../errors/errors");

exports.getChatById = async (req, res) => {
  if (!req.param.chatId)
    // Checks if query is missing
    throw new CustomBadRequestError(
      "Necessary input missing",
      "chatId query parameter is missing",
      "Make sure the query is correctly written and not empty",
      req.originalUrl
    );

  const chat = await prisma.getChat(req.param.chatId);

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
  if (!req.param.userId)
    // Checks if query is missing
    throw new CustomBadRequestError(
      "Necessary input missing",
      "Target ID query parameter is missing",
      "Make sure the query is correctly written and not empty",
      req.originalUrl
    );

  const chat = await prisma.createChat(req.user.id, req.param.userId);

  res.json({
    status: "success",
    data: chat,
  });
};
