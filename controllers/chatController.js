// imports
const prisma = require("../db/queries");
const {
  CustomBadRequestError,
  CustomNotFoundError,
} = require("../errors/errors");

exports.postChat = async (req, res) => {
  if (!req.query.targetId)
    // Checks if query is missing
    throw new CustomBadRequestError(
      "Necessary input missing",
      "Target ID query parameter is missing",
      "Make sure the query is correctly written and not empty",
      req.originalUrl
    );

  const chat = await prisma.createChat(
    req.user.id,
    parseInt(req.query.targetId)
  );

  res.json({
    status: "success",
    data: chat,
  });
};

exports.getUserChats = async (req, res) => {
  if (!req.query.userId)
    // Checks if query is missing
    throw new CustomBadRequestError(
      "Necessary input missing",
      "userId query parameter is missing",
      "Make sure the query is correctly written and not empty",
      req.originalUrl
    );

  const user = await prisma.getUserById(req.query.userId, true);

  if (!user)
    throw new CustomNotFoundError(
      "User not found",
      "The userId does not belong to any existent user",
      "Try making sure it is correct and the user exists",
      req.originalUrl
    );

  res.json({
    status: "success",
    data: user,
  });
};

exports.getChatMessages = async (req, res) => {
  if (!req.query.chatId)
    // Checks if query is missing
    throw new CustomBadRequestError(
      "Necessary input missing",
      "chatId query parameter is missing",
      "Make sure the query is correctly written and not empty",
      req.originalUrl
    );

  const chat = await prisma.getChatMessages(req.query.chatId);

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
