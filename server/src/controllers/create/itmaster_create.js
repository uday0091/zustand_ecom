let {app} = require("../../app.js")
let  itmasterModel = require("../../model/itmaster.model.js")



app.post("/itemcreate", async (req, res)=>{
    let {itname,itgroup} = req.body
    try {

        let duplicateitem = await itmasterModel.findOne({itname})
        if(duplicateitem){
            res.json({created:false , msg:" duplicate not allow"})
        }else{
            let item1 = await itmasterModel({itname , itgroup})
            item1.save()
        res.json({created : true , item1, msg:" Item Created"})
        }
        

        
    } catch (error) {
        res.status(401).json({created:false , msg:"something went wrong"})
        console.log(error)
    }
})