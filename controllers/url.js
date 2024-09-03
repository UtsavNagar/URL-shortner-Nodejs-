const shortid = require("shortid")
const URL = require("../models/url")

async function handleGenerateShortURL(req,res) {
    const body = req.body;

    if(!body.url){
        return res.status(400).json({error:"url is required"});
    }

    const shortID = shortid();
    await URL.create({
        shortId:shortID,
        redirectURL:body.url,
        visitedHistory:[],
        createdBy:req.user._id
    })

    return res.render("home",{id:shortID})
};

async function handleGetAnalitics(req,res) {
    const shortId = req.params.shortId
    const result = await URL.findOne({ shortId })
    res.json({totalClicks:result.visitedHistory.length,history:result.visitedHistory});
}

module.exports = {
    handleGenerateShortURL,
    handleGetAnalitics
}