const prisma = require("../db/user");

exports.testController = async (req, res) => {
  const users = await prisma.getAllUsers();

  res.send(users);
};
