let mongoose = require('mongoose')



let itemSchema = new mongoose.Schema({
    itemname:{
        type: String,
        require:true
    },
    itemgroup:{
        type: String,
        require:true
    },
    image:{
        type: String,
        require:true
    },
    purity:{
        type: String,
       
    },
    design:{
        type: String,
        
    },
    gwt:{ 
        type:Number
    },
    nwt:{
        type:Number
    },
    dwt:{
        type:Number
    },
    clr:{
        type:String
    },
    dwt1:{
        type:Number
    },
    clr1:{
        type:String
    },
    dwt2:{
        type:Number
    },
    clr2:{
        type:String
    },
    swt:{
        type:Number
    },
    swt1:{
        type:Number
    },
    owt:{
        type:Number
    },
    mrp:{ 
        type:Number
    },     
    userid:{
             type:String
       },     
    itemid:{
            type: String,
       },
    quantity:{
            type:Number,
           
       }

},{ _id: false })


const orderschema = new mongoose.Schema({
    userid: { type: String, required: true },
    items: [itemSchema],
}, { timestamps: true });

let orderModel = mongoose.model("order" , orderschema)

module.exports = orderModel ;