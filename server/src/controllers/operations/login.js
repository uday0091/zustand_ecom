let {app}  = require('../../app')
let jwt = require ('jsonwebtoken')
let securitykey ="areyousure"
let bcrypt = require('bcrypt')
let signupModel = require("../../model/signup")



app.post('/login', async(req, res)=>{
    let { email , password } = req.body;
    console.log(req.body)
    let message ="";
    let valid = false;
    let token="";
    
    try {
        // let  user = await signupModel.findOne({ email })
        let user = await signupModel.findOne({email})
        console.log(user)
        if(!user){
            message='user not found'
            return res.status(404).json({ valid, message });
        }
        matchpassword = await bcrypt.compare(password , user.password)
         if(!matchpassword){
            message='password does not match'
            return res.status(401).json({ valid, message });
        }   
        valid= true;
        message="user login"
        token = await jwt.sign({id : user._id}, securitykey,{expiresIn:"24h"})
        res.cookie("jwt",token,{
            secure:false,
            httpOnly:true,
            sameSite:"strict",
            maxAge: 24 * 60 * 60 * 1000
            
        })
        console.log(req.cookies.jwt , 39 )
         res.json({valid , message , user ,token })
    } catch (error) {
        console.log(error)
        res.status(500).json({ valid: false, message: "Internal server error" });
    }
})