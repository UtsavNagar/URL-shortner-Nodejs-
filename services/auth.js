const JWT = require("jsonwebtoken");
const secreteKey = "utsav$ji@NAGAR"

function setUser (user) {
    const payload = {
        _id : user._id,
        email : user.email
    }
    return JWT.sign(payload,secreteKey);        // genrating jwt tokens
}

function getUser (token) {
    if(!token) return null
    try{
        return JWT.verify(token,secreteKey)
    }catch(e){
        console.log(e);
        return e;
    }
}

module.exports = {
    setUser,
    getUser
}
