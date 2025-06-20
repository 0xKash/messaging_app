const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

//

exports.getAllUsers = async () => {
  try {
    return await prisma.user.findMany({});
  } catch (err) {
    console.error(err);
  }
};

exports.getUser = async () => {
  try {
    return await prisma.user.findUnique({
      where: {
        id: parseInt(userId),
      },
    });
  } catch (err) {
    console.error(err);
  }
};

exports.getUsersBySearch = async (searhInput) => {
  try {
    return await prisma.user.findMany({
      where: {
        username: {
          startsWith: searhInput,
        },
      },
    });
  } catch (err) {
    console.error(err);
  }
};

exports.createUser = async (username, hash, salt) => {
  try {
    return await prisma.user.create({
      data: {
        username: username,
        hash: hash,
        salt: salt,
      },
    });
  } catch (err) {
    console.error(err);
  }
};

exports.updateAvatar = async (id, avatar) => {
  console.log(id, avatar);

  try {
    await prisma.user.update({
      where: {
        id: id,
      },
      data: {
        avatar: avatar,
      },
    });
  } catch (err) {
    console.error(err);
  }
};
