let {app} = require("../../app")
let itmasterModel = require('../../model/itmaster.model')


app.get("/itemdelete/:id", async (req ,res)=>{
    let id = req.params.id
    try {
        let itemdelete = await itmasterModel.findOneAndDelete({_id : id })
        res.json({deleted:true , itemdelete, msg:"item deleted"})
    } catch (error) {
        console.log(error)
    }
})