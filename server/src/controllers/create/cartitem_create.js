let {app} = require("../../app.js")
let cartitemModel = require("../../model/cartitem.model.js")


app.post("/cartitem", async (req ,res)=>{
    let{userid ,pro}= req.body
    console.log(pro)
  try {

    let existing = await cartitemModel.findOne({userid:userid,itemid:pro._id});

    if (existing) {
      existing.quantity += 1;
      await existing.save();
      res.json({ success: true, message: "Quantity increased", item: existing });
    }else{
      let data = await cartitemModel({
        userid:userid,
        itemid:pro._id,
        itemname:pro.itemname,
        itemgroup:pro.itemgroup,
        image:pro.image,
        purity:pro.purity,
        design:pro.design,
        gwt:pro.gwt,
        nwt:pro.nwt,
        dwt:pro.dwt,
       clr :pro.clr,
       dwt1:pro.dwt1,
       clr1 :pro.clr1,
       dwt2:pro.dwt2,
       clr2 :pro.clr2,
       swt :pro.swt,
       swt1 :pro.swt1,
       owt :pro.owt,
       mrp :pro.mrp,

        quantity:1})
      await data.save()
       res.json({data , message:"Item add"})
    }

  } catch (error) {
    console.log(error)
  }
})


// app.get("/getcartitem/:id", async (req, res)=>{
//   let {id}= uses.params
//   try {
//     let data = await cartitemModel.findById()
    
    
//   } catch (error) {
//    console.log(error) 
//   }

// })