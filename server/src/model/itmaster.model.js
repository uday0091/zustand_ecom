let mongoose = require('mongoose')

let itmasterschema = new mongoose.Schema({
    itname:{
        type:String,
        require:true,
        uppercase: true
        
    },
    itgroup:{
        type: String,
        require:true
    }
},{timestamps:true})

let itmasterModel = mongoose.model("item", itmasterschema)


module.exports = itmasterModel;