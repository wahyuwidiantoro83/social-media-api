const router = require("express").Router()
const { accountsController } = require("../controller");

router.post("/", accountsController.createData);

module.exports = router;