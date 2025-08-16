import React, { useEffect, useState } from "react";
import ExcelJS from "exceljs";
import { saveAs } from "file-saver";

const Order = () => {

  
    let [userorder , setUserOrder] = useState([])
    let [selectedOrder, setselectedOrder] = useState()   

   async function getorderdata(){
        let user = JSON.parse(localStorage.getItem("user")).user._id
       try {
        let data = await fetch(`http://localhost:3400/userorder/${user}`)
        let res = await data.json();
        console.log("userorder", res)
        setUserOrder(res)
        console.log(userorder)
       } catch (error) {
        console.log(error)
       }  
   }
    
  // ........................ one by one feild krne ke kiye.......................

  // const orderWiseGwt = userorder?.data?.map(order => {
  //   const totalGwt = order.items?.reduce((sum, item) => {
  //     return sum + (item.gwt || 0) * (item.quantity || 1); // fallback to 1 if quantity missing
  //   }, 0);
  
  //   return {
  //     orderId: order._id,
  //     grossWeight: totalGwt
  //   };
  // }) || [];

      
  // const orderWiseDwt = userorder?.data?.map(order => {
  //   const totalDwt = order.items?.reduce((sum, item) => {
  //     return   sum + (item.Dwt || 0) * (item.quantity || 1); // fallback to 1 if quantity missing  
  //   }, 0);
  
  //   return {
  //     orderId: order._id,
  //     grossWeight: totalDwt
  //   };
  // }) || [];

  //  console.log(orderWiseGwt,orderWiseDwt)
   
   const orderWiseSummary = userorder?.data?.map(order => {
    let grossWeight = 0;
    let diamondWeight = 0;
    let totalQuantity = 0;
  
    order.items?.forEach(item => {
      const quantity = item.quantity || 1; // default to 1 if quantity is missing
      grossWeight += (item.gwt || 0) * quantity;
      diamondWeight += (item.dwt || 0) * quantity;
      totalQuantity += quantity;
    });
  
    return {
      orderId: order._id,
      grossWeight,
      diamondWeight,
      totalQuantity
    };
  }) || [];
   
   console.log(orderWiseSummary)
   
    function handlevieworder(id){
      // console.log(id)
      let view = document.querySelector('.noview')
      // console.log(view)
      view.classList.add('orderview1')
      view.classList.remove('orderview')
      setselectedOrder(id)
    }

    function handleclose(){
      let view = document.querySelector('.noview')
      // console.log(view)
      view.classList.add('orderview')
      view.classList.remove('orderview1')
    }


    const exportOrderDetailsToExcel = (orderId) => {
      const order = userorder?.data?.find(o => o._id === orderId);
      if (!order) return;
  
      const orderItems = order.items.map((item, i) => ({
        SrNo: i + 1,
        image:item.image,
        Name: item.itemname,
        GrossWeight: item.gwt,
        DiamondWeight: item.dwt,
        Purity: item.purity,
        Quantity: item.quantity
      }));
  
      const worksheet = XLSX.utils.json_to_sheet(orderItems);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, `Order_${orderId}`);
  
      const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
      saveAs(new Blob([excelBuffer], { type: "application/octet-stream" }), `Order_${orderId}.xlsx`);
    };


   
   useEffect(()=>{
     getorderdata()
     
  },[]) 
  
 

  return (
    <>
      <div className="container-fliut cart userorder">
            <h2>Order List</h2>
            
        <div className="row userorderitem">
          <div className="col-lg-12 border border-3">
            <div className="">
              <table class="table table-bordered">
                <thead >
                  <tr >
                    <th scope="col" className="bg-warning tblid" id="tblid">Order.No.</th>
                    {/* <th scope="col" className="bg-warning" >Image</th> */}
                    {/* <th scope="col" className="bg-warning">Item Name</th> */}
                    <th scope="col" className="bg-warning">Weight</th>
                    <th scope="col" className="bg-warning">D.wt</th>
                    {/* <th scope="col" className="bg-warning">Purity</th> */}
                    <th scope="col" className="bg-warning">Quantity</th>
                    <th scope="col" className="bg-warning">Action</th>
                    
                  </tr>
                </thead>
                <tbody>

                        {
                          orderWiseSummary.map((ord)=>{
                            return (
                              <>
       
                              <tr className="p-0" key={ord.orderId}>
                            <th className=" p-2 "  scope="row"><strong>Order_Id : </strong> {ord.orderId}</th>
                            <td className="p-2">{ord.grossWeight.toFixed(3)}</td>
                            <td className="p-2">{ord.diamondWeight}</td>
                            <td className="p-2">{ord.totalQuantity}</td>
                            <td className="p-2" >
                               <i class="fa-solid fa-file-arrow-down bg-danger p-2 rounded-2  "> pdf</i>
                               <i class="fa-solid fa-file-arrow-down bg-success p-2 rounded-2 ms-1" 
                                onClick={() => exportOrderDetailsToExcel(ord.orderId)}
                                 style={{ cursor:"pointer" }}> exc</i>
                               <i class="fa-solid fa-expand bg-primary rounded-2 p-2   ms-1 " onClick={()=>{handlevieworder(ord.orderId)}} style={{cursor:"pointer"}}> view</i>
                            </td>
                            {/* <td className="p-0"><img src={`server/assets/product/`}  alt="img" style={{width:"40px", borderRadius:"50%"}} className="p-0"/></td>
                            <td className="p-2">{}</td>
                            <td className="p-2">{}</td>
                            <td className="p-2">{}</td>
                            <td className="p-2">{} </td>
                            <td className=" text-center  " style={{width:"175px"}}>
                            <button className="p-1 me-2" >Remove</button> 
                            </td> */}
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
        {/* <div className="row">
                <div className="col-lg-5 totalpart">
                <div className="row">
                <div class="input-group mb-3 col-3 " style={{width:"200px"}}>
                    <span class="input-group-text" >Gross Wt.</span>
                    <input type="text" class="form-control" value=''  />
                  </div>
                  <div class="input-group mb-3 col-3" style={{width:"200px"}}>
                    <span class="input-group-text" >D.Wt.</span>
                    <input type="text" class="form-control"  value='' />
                  </div>
                 
                  
                </div>
                   
                </div>
                <div className="col-lg-5 position-relative bg-d">
                  <button className="btn btn-success p-2 buttonposition"> EXCEL EXPORT </button>

                </div>    
        </div> */}
      </div>



{/* ...................................order view....................................... */}
        <div className="noview orderview">
        <div className="container-fliut cart userorder">
            <h2 style={{marginRight:"150px"}}>selectedOrder_id:{selectedOrder} </h2>
            <h1 style={{position:"absolute", right:"10px",top:"0",cursor:"pointer",zIndex:"222"}} className="bg-dark , px-2 text-light rounded-3" onClick={handleclose}>X</h1>
        <div className="row userorderitem">
          <div className="col-lg-12 border border-3">
            <div className="">
              <table class="table table-bordered">
                <thead >
                  <tr >
                    <th scope="col" className="bg-warning">Order.No.</th>
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

                        {/* {
                          userorder?.data?.map((order, orderIndex) => (
                         order.items?.map((item, itemIndex) => (
                        
                      <tr key={`${orderIndex}-${itemIndex}`}>
                        <td>{orderIndex + 1}.{itemIndex + 1}</td>
                        <td><img src={`server/assets/product/${item.image}`} alt="img" style={{width:"40px", borderRadius:"50%"}} /></td>
                        <td>{item.name}</td>
                        <td>{item.gwt}</td>
                        <td>{item.dwt}</td>
                        <td>{item.purity}</td>
                        <td>{item.quantity}</td>
                      </tr>
  ))
                          ))
                        }    */}

                      {
                        userorder?.data?.find(order => order._id === selectedOrder)?.items?.map((item,i)=>{

                          return(
                            <>
                            <tr key={i}>
                        <td>{i+1}</td>
                        <td><img src={`server/assets/product/${item.image}`} alt="img" style={{width:"40px", borderRadius:"50%"}} /></td>
                        <td>{item.name}</td>
                        <td>{item.gwt}</td>
                        <td>{item.dwt}</td>
                        <td>{item.purity}</td>
                        <td>{item.quantity}</td>
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
        
      </div>

        </div>


    </>
  );
};

export default Order;
