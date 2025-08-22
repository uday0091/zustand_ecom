let {app} = require("../../app.js")
let productModel = require('../../model/product.model.js')



app.get("/product", async (req ,res)=>{
    try {
        let data = await productModel.find()
        res.json(data)
    } catch (error) {
        console.log(error)
    }
})

app.get("/product/:id", async (req , res)=>{
    let id = req.params.id
    console.log(id)
    
    try {    
        let data = await  productModel.findOne({ _id : id})
        res.json({ received:true  ,  data})
    } catch (error) {
       console.log(error) 
    }
})

app.get("/readprodcut/:id",async (req ,res )=>{
    let id = req.params.id
    console.log(id,"18")
    try {
        let singleproduct = await productModel.findOne({_id : id}).select("-createdAt -updatedAt -__v ")
        res.json({readed: true , singleproduct})
        console.log(singleproduct)
    } catch (error) {
        console.log(error)
        
    }
})