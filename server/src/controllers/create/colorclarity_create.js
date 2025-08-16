let {app} = require("../../app.js")
let  ColorclarityModel = require("../../model/colorclarity.model.js")



app.post("/colorclaritycreate", async (req, res)=>{
    let {color_clarity,itgroup} = req.body
    try {

        let duplicateitem = await ColorclarityModel.findOne({color_clarity})
        if(duplicateitem){
            res.json({created:false , msg:" duplicate not allow"})
        }else{
            let colorclarity = await ColorclarityModel({color_clarity , itgroup})
            colorclarity.save()
        res.json({created : true , colorclarity, msg:" color/clarity Created"})
        }
        

        
    } catch (error) {
        res.status(401).json({created:false , msg:"something went wrong"})
        console.log(error)
    }
})