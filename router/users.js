const router = require("express").Router()
const { userController } = require("../controller");
const { validateRegist, validateToken } = require("../middleware/validation");

router.post("/login", userController.login);
router.get("/keep/login", validateToken , userController.keepLogin);
router.post("/regis", validateRegist, userController.register)
router.patch("/verify",validateToken, userController.verifyUser)

module.exports = router;