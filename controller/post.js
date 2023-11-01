const { posts } = require("../models");
const createPost = async (req, res) => {
  try {
    if (req.body.tweet.length <= 150 && req.body.image.split("http").length < 3) {
      const result = await posts.create(req.body);
      return res.status(200).send({ success: true, message: "Succes create post", result: result });
    } else {
      throw { rc: 400, success: false, message: "failed create post" };
    }
  } catch (error) {
    return res.status(error.rc || 400).send(error);
  }
};

const getPost = async (req, res) => {
  try {
    const result = await posts.findAll();
    const getTweetMade = (strDate) => {
      const date = new Date(strDate);
      const dateNow = new Date();
      const diff = Math.floor(dateNow / (1000 * 3600 * 24)) - Math.floor(date / (1000 * 3600 * 24));
      switch (diff.toString()) {
        case "0":
          return "Today";
        case "1":
          return "Yesterday";
        default:
          return "Some days ago";
      }
    };
    let output = result.map((value, idx) => {
      return {
        id: value.id,
        tweet: value.tweet,
        image: value.image,
        idUser: value.idUser,
        tweetMade: getTweetMade(value.createdAt),
      };
    });
    return res.status(200).send({ success: true, message: "success get data", result: output });
  } catch (error) {
    return res.status(error.rc || 400).send(error);
  }
};

const editPost = async (req, res) => {
  try {
    if (req.params?.id) {
      let editData = {};
      if (req.body?.tweet) {
        if (req.body?.tweet.length <= 150) {
          editData.tweet = req.body?.tweet;
        } else {
          throw { rc: 400, success: false, message: "invalid tweet length" };
        }
      }
      if (req.body?.image) {
        if (req.body?.image.split("http").length < 3) {
          editData.image = req.body?.image;
        } else {
          throw { rc: 400, success: false, message: "Invalid image url" };
        }
      }
      const result = await posts.update(editData, { where: { id: req.params.id } });
      return res.status(200).send({ success: true, message: "Succes create post", result: result });
    } else {
      throw { rc: 400, success: false, message: "No parameter" };
    }
  } catch (error) {
    return res.status(error.rc || 400).send(error);
  }
};

module.exports = {
  createPost,
  getPost,
  editPost,
};
