require("dotenv").config();

// imports
const express = require("express");
const cors = require("cors");

const passport = require("passport");
require("./config/passport")(passport);

const userRouter = require("./routers/userRouter");
const chatRouter = require("./routers/chatRouter");
const messageRouter = require("./routers/messageRouter");

// app setup
const app = express();

app.use(cors());

app.use(express.json());
app.set(express.urlencoded({ extended: true }));

app.use(passport.initialize());

app.use("/users", userRouter);
app.use("/chats", chatRouter);
app.use("/messages", messageRouter);

// errorhandler
app.use((err, req, res, next) => {
  console.log(err);
  res.status(err.statusCode || 500).send(err);
});

app.listen(process.env.PORT, (req, res) =>
  console.log(`Listening on PORT: ${process.env.PORT}`)
);
