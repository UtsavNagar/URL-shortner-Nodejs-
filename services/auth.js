const JWT = require("jsonwebtoken");
const secreteKey = "utsav$ji@NAGAR"

function setUser (user) {
    return JWT.sign(user,secreteKey);        // genrating jwt tokens
}

function getUser (id) {
    return sessionIdToUserMap.get(id);
}

module.exports = {
    setUser,
    getUser
}