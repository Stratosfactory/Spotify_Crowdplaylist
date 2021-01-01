const User = require("../models/user")
const bcrypt = require("bcryptjs")
const webtoken = require("jsonwebtoken")

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
    let loadedUser

    User.findOne({ username: userName })
        .then((user) => {


            const error = new Error("Invalid user name");
            error.statusCode = 401;

            if (!user) {
                throw error;
            }
            loadedUser = user
            return bcrypt.compare(password, user.password)

        })
        .then((passwordCorrect) => {
            if (!passwordCorrect) {
                res.status(401).json({
                    message: "Invalid Password"
                })
            } else {
                const token = webtoken.sign({
                    email: loadedUser.email,
                    userName: loadedUser.username
                }, "theserverssecret1337", { expiresIn: "1h" });

                res.status(201).json({
                    token: token
                })

            }

        })
        .catch((err) => console.log(err))

});