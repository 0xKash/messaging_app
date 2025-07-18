// imports
const { PrismaClient } = require("@prisma/client");
const { connect } = require("../routers/userRouter");

// prisma client setup
const prisma = new PrismaClient();

// user queries
exports.getUserById = async (userId, includeChat) => {
  try {
    return await prisma.user.findUnique({
      where: {
        id: parseInt(userId),
      },
      include: {
        chats: includeChat,
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
      include: {
        chat: true,
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

// chat queries
exports.createChat = async (userId, targetId) => {
  try {
    return await prisma.chat.create({
      data: {
        users: {
          connect: [{ id: userId }, { id: targetId }],
        },
      },
      include: {
        users: true,
      },
    });
  } catch (err) {
    console.error(err);
  }
};

exports.getChatMessages = async (chatId) => {
  try {
    return await prisma.chat.findUnique({
      where: {
        id: parseInt(chatId),
      },
      include: {
        messages: true,
      },
    });
  } catch (err) {
    console.error(err);
  }
};

// message queries
exports.createMessage = async (content, authorId, chatId) => {
  try {
    return await prisma.message.create({
      data: {
        content: content,
        chat: {
          connect: { id: parseInt(chatId) },
        },
        author: {
          connect: { id: parseInt(authorId) },
        },
      },
    });
  } catch (err) {
    console.error(err);
  }
};

// dev queries (only used for development purposes)
exports.getAllUsers = async (includeChat, includeMessages) => {
  try {
    return await prisma.user.findMany({
      include: {
        chats: includeChat,
        messages: includeMessages,
      },
    });
  } catch (err) {
    console.error(err);
  }
};

exports.deleteAllUsers = async () => {
  try {
    await prisma.user.deleteMany({});
  } catch (err) {
    console.error(err);
  }
};

exports.getUserByUsername = async (username) => {
  try {
    console.log(username);

    return await prisma.user.findUnique({
      where: {
        username: username,
      },
    });
  } catch (err) {
    console.error(err);
  }
};

//
