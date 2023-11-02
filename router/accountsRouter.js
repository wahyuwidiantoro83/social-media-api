const router = require("express").Router()
const { accountsController } = require("../controller");

router.post("/", accountsController.createData);
router.post("/regis", accountsController.register)

module.exports = router;