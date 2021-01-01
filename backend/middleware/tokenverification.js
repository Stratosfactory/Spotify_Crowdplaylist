const webtoken = require("jsonwebtoken")

module.exports = ((req, res, next) => {
    const token = req.get("Authorization").split(" ")[1];
    let decodedToken;
    try {
        decodedToken = webtoken.verify(token, "theserverssecret1337");
    } catch (err) { res.status(401).json({ message: "Authorization failed - Invalid Token" }) }

    if (!decodedToken) {
        res.status(401).json({ message: "Authorization failed - Invalid Token" })
    }

    next()
})