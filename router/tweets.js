const { tweetController } = require("../controller");
const { uploader } = require("../helper/uploader");
const { validateToken, authorizeUser } = require("../middleware/validation");
const router = require("express").Router();

router.post("/",
validateToken,
authorizeUser,
uploader("/tweet").single("fileUpload"), 
tweetController.createTweet) // "/tweet akan menjadi parameter sesuai dengan yang ada di helper uploader."

router.get("/", tweetController.getTweet)

module.exports = router