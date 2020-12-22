const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const postSchema = new Schema({
    userName: { type: String, required: true },
    comment: { type: String, required: false },
    spotifyElement: { type: Object, required: true },
    likes: { type: Number, required: true },

})

module.exports = mongoose.model("Post", postSchema);