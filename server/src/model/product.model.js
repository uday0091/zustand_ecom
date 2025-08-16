let mongoose = require('mongoose')



let productschema = new mongoose.Schema({
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
            require:true
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
        description:{
            type: String,
            
        }
})

let productModel = mongoose.model("product" , productschema)

module.exports = productModel