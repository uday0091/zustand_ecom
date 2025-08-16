let {app} = require("../../app.js")
let cartitemModel = require ('../../model/cartitem.model.js')


app.post("/quantity/:id",async (req ,res)=>{
  let {id} = req.body
  let newquantity = 1
  try {
    let finditem = await cartitemModel.findOne({_id:id})
    console.log(finditem)
    if(finditem){
      newquantity += finditem.quantity;
     }
     
     let updateQuantity = await cartitemModel.findOneAndUpdate({_id : id},{ quantity:newquantity},{new:true})
     res.json({updated:true , updateQuantity})
  } catch (error) {
   console.log(error) 
  }
})