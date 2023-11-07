require("dotenv").config();
const PORT = process.env.PORT || 2000;
const express = require("express");
const app = express();
const cors = require("cors");
const bearerToken = require ("express-bearer-token")

app.use(cors());
app.use(express.json());
app.use(bearerToken())

const { postRouter } = require("./router");
app.use("/post", postRouter);

const {accountsRouter} = require("./router");
app.use("/account", accountsRouter);

const {userRouter, tweetsRouter} = require("./router");
app.use("/user", userRouter);
app.use("/tweet", tweetsRouter);
app.use("/public", express.static("public")); // guna bisa mengakses foleder public dalam server



app.listen(PORT, () => {
  console.log(`API RUNNING ON PORT ${PORT}`);
});

