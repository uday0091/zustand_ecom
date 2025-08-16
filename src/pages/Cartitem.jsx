import React, { useEffect, useState } from "react";
import cartitemzustand from "../../Store/cartitem.Zustand";
// import useCartStore from "../../Store/addtocart";

const Cartitem = () => {
    let {usercartitem , cartitemBYuser} = cartitemzustand()
    // let {removeFromCart} = useCartStore()
    let [cartitem , setCartItem ]=useState([])
    console.log(cartitem)

    let sumofgross = 0
    let sumofdia = 0
    function grossfn (){
      usercartitem.map((gross)=>{
        return (
          sumofgross  += gross.gwt * gross.quantity ,
          sumofdia  += gross.dwt * gross.quantity 

        )
      })
      
    }


    async  function removeFromCart (id){
      try {
        const userdetails = localStorage.getItem("user");
          if (!userdetails) return console.log("User not found");
      
          const userid = JSON.parse(userdetails).user._id;
      
          const res = await fetch(`http://localhost:3400/cartitem/remove`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ userid, id }),
          });
      
          const data = await res.json();
          console.log("Remove Response:", data);
      
          if (data.success) {
            if (data.message === "Quantity decreased") {
              // reduce quantity by 1
              
               let decreaseitem = cartitem.map((ci) =>
                 ci.item === id ? { ...ci, quantity: ci.quantity - 1 } : ci
                )

              setCartItem([ ...cartitem, decreaseitem])

            } else if (data.message === "Item removed from cart") {
              // remove completely
            
              let  removeitem = cartitem.filter((ci) => ci.item !== id)
                setCartItem([...cartitem , removeitem])
            }
          }
        } catch (error) {
          console.error("Error removing from cart", error);
        }
      }
      

    async function handlequantity(id){
      console.log(id)
      try {
        let data = await fetch(`http://localhost:3400/quantity/${id}`,{
                  method:'post',
                  body:JSON.stringify({id}),
                  headers:{
                    'Content-Type':'application/json'
                  }
        })
        let res = await data.json()
                console.log(res)
        setCartItem([...cartitem , res])
      } catch (error) {
        console.log(error)
      }
    }
    


    async function handleplaceorder (){
     
      try {
        const user = localStorage.getItem("user");
        const userid = JSON.parse(user).user._id;
        console.log(userid)
        console.log(usercartitem)

        let data = await fetch(`http://localhost:3400/placeorder/${userid}`,{
          method:'post',
          body:JSON.stringify({userid,usercartitem}),
          headers:{
            'Content-Type':'application/json'
          }
       })
       let res = await data.json()
       console.log(res)
       if(res.success){
        alert(res.msg)
        // usercartitem = res.emptyusercart
        
       }
        
      }catch(error){
        console.log(error)
      }

    }


    

    console.log(cartitem)
    grossfn()
  useEffect(()=>{
      cartitemBYuser()
      setCartItem(usercartitem)
  },[cartitem]) 
  
 

  return (
    <>
      <div className="container-fliut cart cartitem">
            <h2>Cart Item</h2>
        <div className="row orderitem">
          <div className="col-lg-12 border border-3">
            <div className="">
              <table class="table table-bordered">
                <thead >
                  <tr >
                    <th scope="col" className="bg-warning">S.No.</th>
                    <th scope="col" className="bg-warning" >Image</th>
                    <th scope="col" className="bg-warning">Item Name</th>
                    <th scope="col" className="bg-warning">Weight</th>
                    <th scope="col" className="bg-warning">D.wt</th>
                    <th scope="col" className="bg-warning">Purity</th>
                    <th scope="col" className="bg-warning">Quantity</th>
                    <th scope="col" className="bg-warning">Action</th>
                    
                  </tr>
                </thead>
                <tbody>
                  {
                    usercartitem.map((cart,i)=>{
                        return(
                          <>
                          <tr className="p-0" key={cart._id}>
                            <th className=" p-2"  scope="row">{i+1}</th>
                            <td className="p-0"><img src={`server/assets/product/${cart.image}`}  alt="img" style={{width:"40px", borderRadius:"50%"}} className="p-0"/></td>
                            <td className="p-2">{cart.itemname}</td>
                            <td className="p-2">{cart.gwt}</td>
                            <td className="p-2">{cart.dwt}</td>
                            <td className="p-2">{cart.purity}</td>
                            <td className="p-2">{cart.quantity} </td>
                            <td className=" text-center  " style={{width:"175px"}}>
                            <button className="p-1 me-2" onClick={()=>removeFromCart(cart._id)}>Remove</button> 
                            <button className="p-1 px-3" onClick={()=>handlequantity(cart._id)}> ADD</button>

                            </td>
                         </tr>
                          </>
                        )
                      })                    
                  }
                 
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="row">
                <div className="col-lg-5 totalpart">
                <div className="row">
                <div class="input-group mb-3 col-3 " style={{width:"200px"}}>
                    <span class="input-group-text" >Gross Wt.</span>
                    <input type="text" class="form-control" value={sumofgross.toFixed(3)}  />
                  </div>
                  <div class="input-group mb-3 col-3" style={{width:"200px"}}>
                    <span class="input-group-text" >D.Wt.</span>
                    <input type="text" class="form-control"  value={sumofdia.toFixed(2)} />
                  </div>
                  {/* <div class="input-group mb-3 col-3" style={{width:"200px"}}>
                    <span class="input-group-text" >Gross Wt.</span>
                    <input type="text" class="form-control"   />
                  </div> */}
                  
                </div>
                   
                </div>
                <div className="col-lg-5 position-relative bg-d">
                  <button className="btn btn-primary p-2 buttonposition" onClick={handleplaceorder}>Place Order </button>

                </div>    
        </div>
      </div>
    </>
  );
};

export default Cartitem;
