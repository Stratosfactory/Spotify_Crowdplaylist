const express = require("express");

const router = express.Router();
const userFeed = require("../controller/feed");
const authentication = require("../middleware/tokenverification")

router.post("/post", userFeed.createPost);

router.get("/posts", userFeed.getPosts);

router.post("/like", userFeed.updateLike);

router.post("/delete", authentication, userFeed.deletePost);

module.exports = router;