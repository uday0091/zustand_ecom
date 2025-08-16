const { app } = require("../../app");
const orderModel = require("../../model/oder.model.js");
const cartitemModel  = require('../../model/cartitem.model.js')
const twilio = require("twilio");
const dotenv = require('dotenv')

dotenv.config()


const accountSid = process.env.TWILIO_ACCOUNT_SID
const authtoken = process.env.TWILIO_AUTH_TOKEN
const client = new twilio(accountSid,authtoken)



app.post("/placeorder/:id", async (req, res) => {
    let { userid, usercartitem } = req.body;
    console.log(usercartitem)
   let emptyusercart = null;
    let gwt = 0;
    usercartitem.map((gw)=>{
        return gwt +=gw.gwt*gw.quantity;
    })



    try {
        const order = new orderModel({
            userid: userid,
            items: usercartitem
        });

        const savedOrder = await order.save();

        if(savedOrder){
            emptyusercart  = await cartitemModel.deleteMany({userid:userid})
        }
        const result = await client.messages.create({
            body:`your order is palace with the weight ${gwt.toFixed(3)} oder send successfully`,
            from:process.env.TWILIO_PHONE_NUMBER,
            to: "+918077058717",
        })

        

        res.json({ success: true, msg: "Order Placed", data: savedOrder , emptyusercart, sid:result.sid});

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, msg: "Error placing order" });
    }
});


































// let {app}= require("../../app") ;
// let orderModel = require ("../../model/oder.model.js");


// app.post("/placeorder/:id", async (req , res) =>{
//     // console.log( req.body,"order_route")
//     let {userid , usercartitem }=req.body;
//     try {
//         // let orders = [];

//         // for (let item of usercartitem) {
//         //     let order = new orderModel({
//         //         userid: userid,
//         //         itemid: item._id,
//         //         itemname: item.itemname,
//         //         itemgroup: item.itemgroup,
//         //         image: item.image,
//         //         purity: item.purity,
//         //         design: item.design,
//         //         gwt: item.gwt,
//         //         nwt: item.nwt,
//         //         dwt: item.dwt,
//         //         clr: item.clr,
//         //         dwt1: item.dwt1,
//         //         clr1: item.clr1,
//         //         dwt2: item.dwt2,
//         //         clr2: item.clr2,
//         //         swt: item.swt,
//         //         swt1: item.swt1,
//         //         owt: item.owt,
//         //         mrp: item.mrp,
//         //         quantity: item.quantity,
//         //     });

//         //     let savedOrder = await order.save();
//         //     orders.push(savedOrder);
//         // }

//         // res.json({ success: true, msg: "Orders Placed", data: orders });


//     let promises = usercartitem.map(item => {
//         return new orderModel({
//             userid: userid,
//             itemid: item._id,
//             itemname: item.itemname,
//             itemgroup: item.itemgroup,
//             image: item.image,
//             purity: item.purity,
//             design: item.design,
//             gwt: item.gwt,
//             nwt: item.nwt,
//             dwt: item.dwt,
//             clr: item.clr,
//             dwt1: item.dwt1,
//             clr1: item.clr1,
//             dwt2: item.dwt2,
//             clr2: item.clr2,
//             swt: item.swt,
//             swt1: item.swt1,
//             owt: item.owt,
//             mrp: item.mrp,
//             quantity: item.quantity,
//         }).save();
//     });
    
//     let orders = await Promise.all(promises);
//     res.json({ success: true, msg: "Orders Placed", data: orders });
    

//     } catch (error) {
//         console.log(error)
//     }
// })