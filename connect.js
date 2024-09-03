const mongoose = require("mongoose");

async function connectMoangoDB(url) {
    return mongoose.connect(url )
};

module.exports = {
    connectMoangoDB 
}