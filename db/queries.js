// imports
const { PrismaClient } = require("@prisma/client");

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
        NOT: {
          chats: {
            some: {
              users: {
                some: {
                  id: Number(userId),
                },
              },
            },
          },
        },
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
        id: Number(userId),
      },
      include: {
        chats: includeChat,
      },
    });
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

// chat queries
exports.createChat = async (userId, targetId) => {
  try {
    return await prisma.chat.create({
      data: {
        users: {
          connect: [{ id: Number(userId) }, { id: Number(targetId) }],
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
        id: Number(chatId),
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
            id: Number(userId),
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
          connect: { id: Number(chatId) },
        },
        author: {
          connect: { id: Number(authorId) },
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
        id: Number(id),
      },
      data: {
        avatar: avatar,
      },
    });
  } catch (err) {
    console.error(err);
  }
};
