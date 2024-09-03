const express = require("express");

const {handleGenerateShortURL , handleGetAnalitics} = require("../controllers/url")

const router = express.Router();

router.post("/",handleGenerateShortURL);

router.get("/analytics/:shortId",handleGetAnalitics)

module.exports = router