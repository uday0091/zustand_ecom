let mongoose = require ('mongoose')

let singupSchema = new mongoose.Schema({
    name:{
        type:String
    },
    last_name:{
        type:String,
    },
    email:{
        type:String,
    },
    password:{
        type: String
    },
    mobile:{
        type:Number
    },
    role:{
        type:String,
    },
    avtar:{
        type:String
    }
},{timestamps:true})

let signupModel = mongoose.model("user", singupSchema)

module.exports = signupModel