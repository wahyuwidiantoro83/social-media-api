const { postController } = require("../controller");

const router = require("express").Router();

router.post("/", postController.createPost);
router.get("/", postController.getPost);
router.patch("/:id", postController.editPost);

module.exports = router;
