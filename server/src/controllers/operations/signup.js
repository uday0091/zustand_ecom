let {app , upload} = require ('../../app')
let bcrypt = require("bcrypt")
let jwt = require("jsonwebtoken")
let securitykey = "areyousure"
let signupModel = require("../../model/signup")



app.post('/signup',  upload.single('avtar')  , async (req , res) =>{
    let {password,email} = req.body;
    
    try {
    let user = await signupModel.findOne({email})
    if(user){
        res.json({created:false ,message :"user allready exits"})
    }else{
        let hashpassword = await bcrypt.hash( password  , 10)

        let userdata = await signupModel.create({...req.body , password:hashpassword , avtar:req.file.filename})
        console.log(userdata, "21")
        let token = await jwt.sign({id:userdata._id} , securitykey ,{expiresIn:"24h"})
        console.log(token, "23")
        res.cookie("jwt" ,token ,{
            secure:false,
            maxAge: 24 * 60 * 60 * 1000,
            sameSite:true,
            httpOnly:"strict"
        })
        res.json({created:true , userdata , token , message:"user create"})



    }
    
   
   
 } catch (error) {
  console.log(error)  
 }


})