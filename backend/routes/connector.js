const express = require("express");

const router = express.Router();
const spotifyContoller = require("../controller/connector");

router.get("/authorization", spotifyContoller.spotifyConnect);

module.exports = router;