const { default: Axios } = require("axios");
var qs = require('querystring');

const axios = require("axios");
exports.spotifyConnect = (req, res, next) => {

    const headers = { 'Authorization': 'Basic ' + (Buffer.from("1bc6d3dd37b04347a7b15020b0f0472a" + ':' + "f0ca719613e84625a33423ed69b836df")).toString('base64'), 'Content-Type': 'application/x-www-form-urlencoded' }

    axios.post("https://accounts.spotify.com/api/token", qs.stringify({
            grant_type: 'client_credentials'
        }), {
            headers: headers
        })
        .then((response) => {

            res.status(201).json(response.data)

        })
        .catch(error => res.json(error))

};