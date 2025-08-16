let {app}  = require('../../app')
let signupModel = require("../../model/signup")


app.get("/userread", async (req , res )=>{
    try {
        let userall = await signupModel.find().select(" -passwaord")
        res.json({readed:true , userall})

    } catch (error) {
      console.log(error)  
    }
})

