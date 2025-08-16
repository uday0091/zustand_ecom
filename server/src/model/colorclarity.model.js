let mongoose = require('mongoose')

let Colorclarityschema = new mongoose.Schema({
    color_clarity:{
        type:String,
        require:true,
        uppercase: true
        
    },
    itgroup:{
        type: String,
        require:true
    }
},{timestamps:true})

let ColorclarityModel = mongoose.model("colorclarity", Colorclarityschema)


module.exports = ColorclarityModel;