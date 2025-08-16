let {app} = require("../../app.js")
let itmasterModel = require('../../model/itmaster.model.js')


app.get("/itemread",async (req, res)=>{
    try {
        let data = await itmasterModel.find();
        res.json({data})
        
    } catch (error) {
        console.log(error)
    }
})


app.get("/item/:id",async (req ,res )=>{
    let id = req.params.id
    console.log(id,"18")
    try {
        let item = await itmasterModel.findOne({_id : id}).select("-createdAt -updatedAt -__v ")
        res.json({readed: true , item})
    } catch (error) {
        console.log(error)
        
    }
})