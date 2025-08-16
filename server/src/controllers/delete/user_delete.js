let {app} = require("../../app")
let signupModel = require('../../model/signup')


app.get("/userdelete/:id", async (req ,res)=>{
    let id = req.params.id
  
    try {
        let userdelete = await signupModel.findOneAndDelete({_id : id })
        res.json({deleted:true , userdelete, msg:"user deleted"})
    } catch (error) {
        console.log(error)
    }
})