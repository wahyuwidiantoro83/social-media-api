const { accountController } = require("../controller")
const router = require("express").Router()

router.get("/", accountController.getLoginData)

module.exports=router