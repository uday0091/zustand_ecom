let{app , productmulter}= require('../../app')
let productModel = require("../../model/product.model")


app.post("/addproduct", productmulter.single("image"), async (req, res)=>{
    try {
        let productadd = await productModel.create({...req.body, image:req.file.filename})
        res.json({created : true , productadd , msg:"product add"})
        
    } catch (error) {
        console.log(error)
    }
    
})