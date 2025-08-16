let mongoose = require('mongoose')



let cartitemschema = new mongoose.Schema({
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
            default:1,
       }

},{timestamps:true})

let cartitemModel = mongoose.model("cartitem" , cartitemschema)

module.exports = cartitemModel