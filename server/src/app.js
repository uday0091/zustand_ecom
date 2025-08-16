let express = require("express")
let app = express()
let cookieparser = require("cookie-parser")

let cors = require("cors")
let multer = require("multer")
const path = require("path");
const fs = require("fs");

app.use(express.json())
app.use(express.static("../assets"))
app.use(cookieparser())
app.use(cors({
    origin:["http://localhost:5173"],
    credentials:true
}))



const uploadDir = path.join(__dirname, '../assets/upload');

// Ensure the folder exists
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}







const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null,  uploadDir)
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, uniqueSuffix  + '-' + file.originalname )
    }
  })
  
  const upload = multer({ storage: storage })




  const uploadDir1 = path.join(__dirname, '../assets/product');

  if (!fs.existsSync(uploadDir1)) {
    fs.mkdirSync(uploadDir1, { recursive: true });
  }


  const storage1 = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null,  uploadDir1)
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, uniqueSuffix  + '-' + file.originalname )
    }
  })
  
  const productmulter = multer({ storage: storage1 })



module.exports = {app,upload,productmulter}