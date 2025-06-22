const prisma = require("../db/queries");
const { CustomBadRequestError } = require("../errors/errors");

exports.postChat = async (req, res) => {
  if (!req.query.targetId)
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
    throw new CustomBadRequestError(
      "Necessary input missing",
      "userId query parameter is missing",
      "Make sure the query is correctly written and not empty",
      req.originalUrl
    );

  const user = await prisma.getUserById(req.query.userId, true);

  res.json({
    status: "success",
    data: user,
  });
};
