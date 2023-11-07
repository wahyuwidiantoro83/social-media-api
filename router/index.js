const userRouter = require("./users")
const postRouter = require("./post");
const accountsRouter = require("./accountsRouter");
const tweetsRouter = require("./tweets")

module.exports = { postRouter,accountsRouter, userRouter, tweetsRouter };
