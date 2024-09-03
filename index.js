const express = require("express");
const path = require("path");
const { connectMoangoDB }= require("./connect")
const URL = require("./models/url")
const cookieParser = require("cookie-parser")
const {restrictToLoggedInUserOnly , checkAuth}  = require("./middleware/auth")

const urlRoute = require("./routes/url")
const staticRoute = require("./routes/staticRouter")
const userRoute = require("./routes/user");

const app = express();
const PORT = 8001; 

app.set("view engine","ejs");
app.set("views",path.resolve("./views"));

connectMoangoDB("mongodb://localhost:27017/short-url")
.then(()=>console.log("database connected"))

app.use(express.json());
app.use(express.urlencoded({extended : false}));
app.use(cookieParser())

app.use("/url",restrictToLoggedInUserOnly,urlRoute);
app.use("/", checkAuth ,staticRoute);
app.use("/user",userRoute);

app.get("/url/:shortId",async (req,res)=>{
     const shortId = req.params.shortId;

     const entry = await URL.findOneAndUpdate({
        shortId
     },{
        $push:{
            visitedHistory:{ 
                timestamp : Date.now() 
            },
        }
     })

     res.redirect(entry?.redirectURL)
})

app.listen(PORT, ()=>console.log(`Server Started a PORT = ${PORT}`));