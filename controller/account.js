const { verifyPassword } = require("../helpers/encryption");
const transporter = require("../helpers/mailer");
const { accounts } = require("../models");
const jwt = require("jsonwebtoken");

const login = async (req, res, next) => {
  try {
    console.log(req.body);
    const checkUser = await accounts.findOne({
      where: {
        email: req.body.email,
      },
      raw: true,
    });
    if (checkUser) {
      const checkPassword = await verifyPassword(req.body.password, checkUser.password);
      if (!checkPassword) {
        return res.status(400).send({
          success: false,
          message: "Wrong password",
        });
      }
      if (checkUser.isVerified) {
        const { id, username, email, role } = checkUser;
        let token = jwt.sign({ id, username, role }, process.env.SCRT_KEY, { expiresIn: "24h" });
        return res.status(201).send({
          success: true,
          message: "Login succes",
          result: {
            username,
            email,
            token,
          },
        });
      } else {
        return res.status(400).send({
          success: false,
          message: "Account is not verified",
        });
      }
    } else {
      return res.status(400).send({
        success: false,
        message: "Account not found",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(error.rc || 500).send({
      success: false,
      error,
    });
  }
};

const keepLogin = async (req, res, next) => {
  try {
    const checkLogin = jwt.verify(req.token, process.env.SCRT_KEY);
    if (checkLogin) {
      const data = await accounts.findOne({
        where: {
          id: checkLogin.id,
        },
      });
      const { id, username, role, email } = data;
      const token = jwt.sign(
        {
          id,
          username,
          role,
        },
        process.env.SCRT_KEY,
        { expiresIn: "24h" }
      );
      return res.status(201).send({
        success: true,
        username,
        email,
        token,
      });
    }
    console.log(checkLogin);
  } catch (error) {
    console.log(error);
    return res.status(error.rc || 500).send({
      success: false,
      error,
    });
  }
};

const register = async (req, res, next) => {
  try {
    const result = await accounts.create(req.body);
    const { id, email } = result;
    const token = jwt.sign(
      {
        id,
        email,
      },
      process.env.SCRT_KEY,
      { expiresIn: "1h" }
    );
    //Send Email
    await transporter.sendMail({
      from: "TUITER",
      to: req.body.email,
      subject: "Registration Succes",
      html: `<h1>Hello, ${req.body.username}, your registration is succes</h1><a href="http://localhost:2023/verify/${token}">Verify Account</a>`,
    });
    return res.status(200).send({
      success: true,
      message: "Register Success",
    });
  } catch (error) {
    console.log(error);
    return res.status(error.rc || 500).send(error);
  }
};

const verify = async (req, res, next) => {
  try {
    const token = req.params.token;
    const verifyToken = jwt.verify(token, process.env.SCRT_KEY);
    console.log(verifyToken);
    await accounts.update(
      { isVerified: true },
      {
        where: {
          id: verifyToken.id,
        },
      }
    );
    return res.status(201).send({
      success: true,
      message: "Verification success",
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = { register, login, keepLogin, verify };
