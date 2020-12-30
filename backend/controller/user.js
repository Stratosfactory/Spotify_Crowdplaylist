const User = require("../models/user")
const bcrypt = require("bcryptjs")

exports.createUser = ((req, res, next) => {
    const userName = req.body.userName
    const email = req.body.email
    const password = req.body.password
    const accessRights = req.body.accessRights

    bcrypt
        .hash(password, 12)
        .then((hashedPw) => {

            const user = new User({
                username: userName,
                password: hashedPw,
                email: email,
                accessRights: accessRights,

            });

            return user.save();
        })
        .then((result) => {
            console.log(userName + " User Created")
            res.status(201).json({
                message: userName + " created as new User"
            })
        })
        .catch((err) => console.log(err))


});

exports.authUser = ((req, res, next) => {
    const userName = req.body.userName
    const password = req.body.password

    User.findOne({ username: userName })
        .then((user) => {


            const error = new Error("Invalid user name");
            error.statusCode = 401;

            if (!user) {
                throw error;
            } else if (user.password != password) {
                throw error
            } else {
                res.status(202).json({
                    message: "authentication successful"
                })
            }

        })
        .catch((err) => console.log(err))

});