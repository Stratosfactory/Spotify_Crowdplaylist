const express = require("express");
const bodyParser = require("body-parser")
const mongoose = require("mongoose")

const app = express();

const connectorRoutes = require("./routes/connector");
const feedRoutes = require("./routes/feed");
const userRoutes = require("./routes/user");

app.use(bodyParser.json());


app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', "*"); // * Stands for wildcard, to specific domain use xyz.com,abc.com --> add more by comma
    res.setHeader("Access-Control-Allow-Methods", "GET,POST,PATCH,PUT,DELETE");
    res.setHeader("Access-Control-Allow-Headers", "*") // specify header types of methods
    next();
})

app.use("/connect", connectorRoutes);
app.use("/feed", feedRoutes);
app.use("/login", userRoutes);


mongoose.set('useUnifiedTopology', true);

mongoose.connect("mongodb+srv://Database_RW_User:6IdTFX4QYiTUuD4p@cluster-alpha.7pxq4.mongodb.net/userfeed?retryWrites=true&w=majority", { useNewUrlParser: true })
    .then((result) => { app.listen(3000) })
    .catch((err) => { console.log(err) })