const User = require("../models/user");
const {setUser} = require("../services/auth")

async function handleUserSignUp(req,res) {
    try{
        const {name,email,password} = req.body;
        
        await User.create({
            name,
            email,
            password
        });

        return res.redirect("/");
    }catch(e){
        console.log(e);
        return "invalid data"
    }
}

async function handleUserLogin(req,res) {
    const {email,password} = req.body;
    
    const user = await User.findOne({email,password});
    if(!user){
        return res.render("login",{
            error:"Invalid email or password"
        });
    }
    const jwtToken = setUser(user);
    res.cookie('uid',jwtToken)
    return res.redirect("/");
}

module.exports = {
    handleUserSignUp,
    handleUserLogin
}