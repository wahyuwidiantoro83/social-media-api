const { postController } = require("../controller");
const { validateToken, validateRole } = require("../middleware/validation");
const jwt = require("jsonwebtoken")


const router = require("express").Router();

router.post("/", validateRole, postController.createPost);
router.get("/", postController.getPost);
router.patch("/:id", postController.editPost);

module.exports = router;
