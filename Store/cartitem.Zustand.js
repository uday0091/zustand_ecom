import { create } from "zustand/react";


let cartitemzustand = create((set)=>({
   usercartitem :[] ,

   cartitemBYuser :async ()=>{
    let user = JSON.parse(localStorage.getItem("user")) 
    let userid = user.user._id
    console.log(userid)
      let data = await fetch(`http://localhost:3400/usercart/${userid}`) 
      let res = await data.json() 
      console.log(res)

     await set({ usercartitem: res});
     

   }
}))



export default cartitemzustand;