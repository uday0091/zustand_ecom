import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useCartStore from "../../Store/addtocart";



const LatestProduct = () => {

let [product , setProduct] = useState([])

const addToCart = useCartStore((state) => state.addToCart);

async function ltstproduct(){
  try {
    let data = await fetch("http://localhost:3400/product")
    let res = await data.json()
    console.log(res)
    setProduct(res)
    console.log(product)
    
  } catch (error) { }
}


// async  function handleaddtocart(e){
// let id = e.target.id
// let userdetails = localStorage.getItem("user")
// let parsedUser = JSON.parse(userdetails);
// let userid = parsedUser.user._id
// // console.log("itemid :-"+id , "userI :-"+userid)
// try {
//   let data =  await fetch("http://localhost:3400/cartitem",{
//     method:"post",
//     body:JSON.stringify({id,userid}),
//     headers: {
//       "Content-Type": "application/json",
//     },
//   })
//  let res = await data.json()
//  console.log(res)


// } catch (error) {
//   console.log(error)
// }

// }





useEffect(()=>{
 ltstproduct()
},[])
  return (
    <>
      <h1 className="">Latest Product</h1>

      <div className="container">
        <div className="row g-5 ">
         {
          product.map((pro)=>{
            return(
              <>
              <div className="col-lg-3 col-md-6">
            <div class="card" style={{width: "18rem" , height:"25rem"}}>
              <img src={`server/assets/product/${pro.image}`} class="card-img-top" style={{width:"286px", height:"200px"}}  alt="..." />
              <div class="card-body">
                <h5 class="card-title"><span>{pro.itemname}</span> <span className="ms-4 bg-dark p-1 text-light rounded-4">{pro.purity}</span>     </h5>
              <h6><span>G.Wt:{pro.gwt}</span> {pro.itemgroup === "Diamond Jewellery"?<span className="ms-5">D.Wt:{pro.dwt}</span> :''  }</h6>
                <p class="card-text">
                 {pro.description.split(" ").slice(0, 7).join(" ")+" ..."}
                </p>
              
               <button   onClick={()=>addToCart(pro)} class="btn btn-primary" id={pro._id} >
                  Add to Cart
                </button>
               
                <Link to={`/product/${pro._id}`} className="btn btn-success ms-3">
                  More Info
                </Link>
              </div>
            </div>
          </div>
              </>
            )
          })
         }


        </div>
      </div>
    </>
  );
};

export default LatestProduct;
