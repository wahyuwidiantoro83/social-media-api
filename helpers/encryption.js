const { join } = require("path");
require("dotenv").config({ path: join(__dirname, "../.env") });
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const hashPassword = async (password) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  } catch (error) {
    console.log(error);
  }
};

const verifyPassword = async (password, hashedPassword) => {
  try {
    const resultVerifiy = await bcrypt.compare(password, hashedPassword);
    return resultVerifiy;
  } catch (error) {
    console.log(error);
  }
};

module.exports = { hashPassword, verifyPassword };
