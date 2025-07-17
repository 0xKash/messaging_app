// imports
const prisma = require("../db/queries");

// Function still in progress...
exports.postMessage = async (req, res) => {
  const message = prisma.createMessage(
    "First time testing this",
    parseInt(req.query.userId),
    parseInt(req.query.chatId)
  );

  res.json({
    status: "success",
    data: message,
  });
};
