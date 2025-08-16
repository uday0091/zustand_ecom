let {app} = require("../../app.js")
let ColorclarityModel = require('../../model/colorclarity.model.js')


app.get("/colorclarityread",async (req, res)=>{
    try {
        let data = await ColorclarityModel.find();
        res.json({data})
        
    } catch (error) {
        console.log(error)
    }
})