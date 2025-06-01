require("dotenv").config();
const express = require("express");
const cors = require("cors");

//

const userRouter = require("./routers/userRouter");

//

const app = express();

app.use(cors());

app.use(express.json());
app.set(express.urlencoded({ extended: true }));

//

app.use("/users", userRouter);

app.use((err, req, res, next) => {
  console.log(err);
  res.status(err.statusCode || 500).send(err);
});

app.listen(process.env.PORT, (req, res) =>
  console.log(`Listening on PORT: ${process.env.PORT}`)
);
