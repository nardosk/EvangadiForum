require('dotenv').config();
const express = require("express");
const cors = require("cors"); // 
const app = express();
const port = process.env.PORT;
const userRouter = require('./server/api/users/user.router');
const questionRouter = require('./server/api/question/question.router');
const answerRouter = require('./server/api/answer/answer.router');


app.use(cors());  //middle ware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/api/users", userRouter);
app.use("/api/question", questionRouter);
app.use("/api/answer", answerRouter);


app.listen(port, () => console.log(`Listening at http://localhost:${port}`)); // 