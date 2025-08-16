let {app} = require("./app")
let port = 3400
let requireDir = require("require-dir")
requireDir("controllers", {recurse:true})
require("./config/config") 



app.listen(port, ()=>{console.log(`server is running on http://localhost:${port}`)})