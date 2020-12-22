const Post = require("../models/post")

exports.createPost = (req, res, next) => {
    const id = req.body.id;
    const userName = req.body.userName;
    const comment = req.body.comment;
    const spotifyElement = req.body.spotifyElement;
    const likes = req.body.likes;

    const post = new Post({
        userName: userName,
        comment: comment,
        spotifyElement: spotifyElement,
        likes: likes

    });

    post
        .save()
        .then((res) => { console.log("Saved Post") })
        .catch((err) => { console.log(err) })

    res.status(201).json({
        message: "Post created",
        post: { id: new Date().toDateString(), id: id, userName: userName }
    });
};

exports.getPosts = (req, res, next) => {
    Post.find()
        .then((posts) => {
            console.log("Success retrieving feed posts")
            res.status(200).json({
                message: "Success ",
                posts: posts,
            })
        })
        .catch((err) => { console.log("Failed to fetch data form MongoDB" + err) })

}


exports.updateLike = (req, res, next) => {
    const postId = req.body._id
    const postLikes = req.body.likes
    Post.findById(postId)
        .then((post) => {
            post.likes = postLikes
            return post.save()
        })
        .then(console.log("Updated Post:" + postId))
        .catch((err) => console.log(err));
    res.status(201).json({
        message: "Likes Updated"
    })
}

exports.deletePost = (req, res, next) => {
    const id = req.body.id
    Post.findByIdAndRemove(id)
        .then(() => console.log("Post Deleted"))
        .catch((err) => console.log(err))
    res.status(200).json({
        message: "Post deleted"
    })
}