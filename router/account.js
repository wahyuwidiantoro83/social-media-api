const router = require("express").Router();
const { accountsController } = require("../controller");
const { validateRegis, validateLogin } = require("../middleware/validation");

router.post("/regis", validateRegis, accountsController.register);
router.post("/login", accountsController.login);
router.get("/checklogin", accountsController.keepLogin);
router.patch("/verify/:token", accountsController.verify);

module.exports = router;
