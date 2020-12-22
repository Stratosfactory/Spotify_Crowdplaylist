const express = require("express");

const router = express.Router();
const userFeed = require("../controller/feed");

router.post("/post", userFeed.createPost);

router.get("/posts", userFeed.getPosts);

router.post("/like", userFeed.updateLike);

router.post("/delete", userFeed.deletePost);

module.exports = router;