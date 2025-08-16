let {app} = require("../../app.js")
let cartitemModel = require ('../../model/cartitem.model.js')


app.get('/usercart/:id', async (req, res)=>{
    let {id} = req.params
    console.log(id)
    try {
        let data = await cartitemModel.find({ userid: id });
        res.json(data)
        console.log(data,"dddddd")

    } catch (error) {
        console.log(error)
    }

})