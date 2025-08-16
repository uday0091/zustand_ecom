let {app} = require ("../../app")
let orderModel = require("../../model/oder.model")

app.get("/userorder/:id", async (req, res)=>{
    let{ id } = req.params
    try {
        
        let data = await orderModel.find({userid:id})
        console.log(data)
        res.json({success:true ,  data})
    } catch (error) {
        console.log(error)
    }
})

