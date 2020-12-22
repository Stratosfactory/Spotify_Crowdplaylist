const User = require("../models/user")

exports.createUser = ((req, res, next) => {
    const userName = req.body.userName
    const email = req.body.email
    const password = req.body.password
    const accessRights = req.body.accessRights

    const user = new User({
        username: userName,
        password: password,
        email: email,
        accessRights: accessRights,

    });

    user.save()
        .then((res) => { console.log("User Created") })
        .catch((err) => console.log(err))

    res.status(200).json({
        message: userName + " created as new User"
    });


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