// imports
const { PrismaClient } = require("@prisma/client");
const { connect } = require("../routers/userRouter");

// prisma client setup
const prisma = new PrismaClient();

// user queries
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

exports.getUsersBySearch = async (searhInput, userId) => {
  try {
    return await prisma.user.findMany({
      where: {
        username: {
          startsWith: searhInput,
        },
      },
      include: {
        chats: {
          include: {
            users: true,
          },
        },
      },
      omit: {
        id: true,
      },
    });
  } catch (err) {
    console.error(err);
  }
};

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

exports.getChat = async (chatId) => {
  try {
    return await prisma.chat.findUnique({
      where: {
        id: parseInt(chatId),
      },
      include: {
        messages: true,
        users: true,
      },
    });
  } catch (err) {
    console.error(err);
  }
};

exports.getChatsByUser = async (userId) => {
  try {
    return await prisma.chat.findMany({
      where: {
        users: {
          some: {
            id: parseInt(userId),
          },
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
      include: {
        chat: true,
        author: true,
      },
    });
  } catch (err) {
    console.error(err);
  }
};

// avatar queries
exports.updateAvatar = async (id, avatar) => {
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
