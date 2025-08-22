import React, { useEffect, useState } from "react";
import { useNavigate, } from "react-router-dom";

const AllProductList = ({setupdate}) => {

let navigate = useNavigate()



   let [ allProduct , setAllProduct ] = useState([])
   let [allitem , setAllItem] = useState([]) 

    async function allitemlist(){
        try {
          let data = await fetch("http://localhost:3400/product")
          let res = await data.json()
          console.log(res)
          setAllProduct(res)
          console.log(product)
          
        } catch (error) { }
      }


      async function itemread(){
        let data = await fetch("http://localhost:3400/itemread")
        let res = await data.json()
        setAllItem(res.data)
        }

        console.log(allitem)
        function handleedititem(e){
          let id = e.target.id
          navigate(`/addproduct/${id}`)
          setupdate(true)

        }

     




 useEffect(()=>{
    allitemlist()
    itemread()
    
 },[])     


  return (
    <div className="allitem">
      <div className="itemlist">
       {
          allitem.map((item,i)=>{

           let count = allProduct.filter(allitem=>allitem.itemname === item.itname).length
           return(
            <>
              <ul className="position:relative">
                  <li className="text-center" style={{display:'inline-block'}} >{i+1 } {item.itname} <span className=" p-1 rounded"  style={{position:"absolute", right:"5px", background:"gray"}}>{count}</span></li> 
              </ul>
            </>
           )
           
       })
       }
      </div>
      <div className="itemdetails">
        <h1>item name </h1>
        {/* <table class="table table-success table-striped-columns"> */}
          <table class=" table table-bordered border-danger table-hover">
            <thead>
              <tr>
                <th className="p-0 text-center" scope="col">S.No.</th>
                <th className="p-0 text-center" scope="col">Itme Name </th>
                <th className="p-0 text-center" scope="col">Purity</th>
                <th className="p-0 text-center" scope="col">Photo</th>
                <th className="p-0 text-center" scope="col">Wt.</th>
                <th className="p-0 text-center" scope="col">D.Wt.</th>
                <th className="p-0 text-center" scope="col">Clr/Clarity</th>
                <th className="p-0 text-center " scope="col" style={{width:"150px"}}>Action</th>

              </tr>
            </thead>
            <tbody class="">
              {
                allProduct.map((allitem,i)=>(
                    <tr className="p-0 text-center">
                <th className="p-0 text-center" scope="row">{i+1}</th>
                <td className="p-0 text-center">{allitem.itemname}</td>
                <td className="p-0 text-center">{allitem.purity}</td>
                <td className="p-0 text-center" ><img src={`server/assets/product/${allitem.image}`} alt="img" style={{width:"31px", borderRadius:"50%"}} /></td>
                <td className="p-0 text-center">{allitem.gwt}</td>
                <td className="p-0 text-center">{allitem.dwt}</td>
                <td className="p-0 text-center">{allitem.clr}</td>
                <td className="text-center p-0"> 
                <i class="fa-solid fa-pen-nib px-3 bg-primary py-2 me-2 " onClick={handleedititem} style={{cursor:'pointer'}} id={allitem._id}></i> 
                <i class="fa-solid fa-trash px-3 bg-danger py-2" style={{cursor:'pointer'}} ></i>
                </td>
              </tr>
                ))
              }
              
              
            </tbody>
          
        </table>
      </div>
    </div>
  );
};

export default AllProductList;
