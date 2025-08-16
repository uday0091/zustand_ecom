let {app} =require("../../app")
let signupModel = require("../../model/signup")
let jwt = require('jsonwebtoken')
let securitykey ="areyousure"



app.get("/auth", async (req, res)=>{
    try {
        let token = req.cookies.jwt
        // console.log(req.cookies.jwt ,"11")
        let decodeuser = await jwt.decode(token , securitykey)
        if(!decodeuser){
            return  res.status(201).json({ auth: false, message: "Please sign up or login" });
        }
        let user = await signupModel.findOne({ _id : decodeuser.id })
        console.log(user)
        res.json({auth:true, user})
    } catch (error) {
        res.status(401).json({ auth: false, message: "Invalid or expired token" });
    }
})
