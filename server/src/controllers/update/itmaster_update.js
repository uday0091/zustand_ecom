let {app} = require("../../app.js")
let itmasterModel = require('../../model/itmaster.model.js')





app.post("/itemupdate/:id",async (req ,res )=>{
    let id = req.params.id
    let {itname , itgroup} = req.body
    
    try {
        let itemupdate = await itmasterModel.findOneAndUpdate({_id : id}, {itname , itgroup},{new:true})
        res.json({updated: true , itemupdate , msg:" user update"})
    } catch (error) {
        console.log(error)
        
    }
})