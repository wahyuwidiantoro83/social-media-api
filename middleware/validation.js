const { hashPassword } = require("../helpers/encryption");
const { accounts } = require("../models");

const validateRegis = async (req, res, next) => {
  if (
    req.body?.username &&
    req.body?.password &&
    req.body?.phone &&
    req.body?.email &&
    req.body?.confirmPass
  ) {
    const isExist = await accounts.findOne({
      where: {
        email: req.body.email,
      },
    });
    if (isExist) {
      return res.status(400).send({
        success: false,
        message: "Account already exist",
      });
    }
    if (req.body.password.length >= 8 && req.body.password === req.body.confirmPass) {
      req.body.password = await hashPassword(req.body.password);
      console.log(req.body.password);
      next();
    } else {
      return res.status(400).send({
        success: false,
        message: "Your password is not valid",
      });
    }
  } else {
    return res.status(400).send({
      success: false,
      message: "Your password is not valid",
    });
  }
};

module.exports = {
  validateRegis,
};
