require("dotenv").config();
const PORT = process.env.PORT || 2000;
const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());
app.use(express.json());

const { postRouter } = require("./router");
app.use("/post", postRouter);

app.listen(PORT, () => {
  console.log(`API RUNNING ON PORT ${PORT}`);
});
