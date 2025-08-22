import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import authuser from '../../Store/store'


const Dashboard = () => {
let navigate = useNavigate()
let [allitem , setAllItem] = useState([]) 
let [alluser , setAllUser] = useState([])
const {setUpdateTrue,update,setUpdateFalse} = authuser()

function handlemaster(){
  let mst = document.querySelector(".master1")
  mst.classList.toggle("master")
}

async function itemread(){
let data = await fetch("http://localhost:3400/itemread")
let res = await data.json()
setAllItem(res.data)
}



async function itemdelete(e){
  let btn = e.target.id
  let sure = confirm(" are you sure ")
  if(sure){
    let data = await fetch(`http://localhost:3400/itemdelete/${btn}`)
  let res = await data.json();
  // console.log(res)
  if(res.deleted){
    alert(res.msg)
    
    let newarr = allitem.filter((itm)=>{
      return itm._id != btn
    })
    setAllItem(newarr)
  }
  }
}

async function itemedit(e){
  let btn = e.currentTarget.id;
   console.log(btn)
  navigate(`/item/${btn}`),
  setUpdateTrue()
  console.log(update)
  
  
}
function handleitem(){
setUpdateFalse()
}


async function userread(){
  let data = await fetch("http://localhost:3400/userread")
  let res = await data.json()
  setAllUser(res.userall )
  }

  async function userdelete(e){
    let btn = e.target.id
    let sure = confirm(" are you sure ")
    if(sure){
      let data = await fetch(`http://localhost:3400/userdelete/${btn}`)
    let res = await data.json();
    console.log(res)
    if(res.deleted){
      alert(res.msg)
      
      let newarr = alluser.filter((user)=>{
        return user._id != btn
      })
      setAllUser(newarr)
    }
    }
  }


  // ..................................... SEARCH CODE......................................
  function handlesear(e){
    const searchValue = e.target.value.toLowerCase();
    console.log(searchValue)
    const filtered = alluser.filter((user) => 
      user.name.toLowerCase().includes(searchValue) ||
      user.email.toLowerCase().includes(searchValue)
    );
    setAllUser(filtered);
    if(!searchValue){
      userread()
    }
  }


useEffect(()=>{
itemread()
userread()
},[])

  return (
    <>
      <div className="dashpage">
        <div className="sidedash">
          <ul>
  
            <Link to="#">
              <li> ...... </li>
            </Link>
            
              
              <li className="mst  " onClick={handlemaster}  > <span className="fs-5 text-dark">Master</span> 
                <ul className= "master master1">
                  <li> <Link to="/signup"> <i class="fa-solid fa-user-plus me-2"></i> Add User</Link></li>
                  <li> <Link to='/item_master' onClick={handleitem}><i class="fa-solid fa-plus me-2"></i>  Item Master</Link></li>
                  <li> <Link to='/diacolor'> <i class="fa-solid fa-plus me-2"></i>  Dia Clr/Clarity</Link></li>
                  <li> <Link to='/addproduct' > <i class="fa-solid fa-camera-retro me-2"></i> Add Procuct</Link></li>
                 
                </ul>
              </li>
              
            <Link to="/allproductlist">
              <li className="fs-5 " style={{color:"ThreeDDarkShadow"}} > All Procuct List</li>
            </Link>
           
            {/* <Link to="#">
              <li> User list </li>
            </Link> */}
            {/* <Link to="#">
              <li> User list </li>
            </Link>
            <Link to="#">
              <li> User list </li>
            </Link> */}
          </ul>
        </div>
        <div className="dashmain">
          <div className="dashcontent  ms-2 ">
            <div className="row p-3 pe-4">
            <div className="usertable p-2 bg-danger  col-lg-6 " style={{height:"350px",overflow:"hidden"}} >
          <input type="text" placeholder=" Search Bar" className="form-control mb-2 " onChange={handlesear}/>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">First</th>
                <th scope="col">Last</th>
                <th scope="col">Handle</th>
              </tr>
            </thead>
            <tbody>
           {
            alluser.map((user,intex)=>{
              return(
                <>
                <tr>
                <th className="" scope="row">{intex+1}</th>
                <td className="p-0" >{user.name}</td>
                <td className="p-0" >{user.email}</td>
                <td className="p-0" > 
                {/* <button className="btn btn-success me-1" id={user._id} ><i  class="fa-solid fa-pencil"></i></button> */}
                     <button className="btn btn-danger" onClick={userdelete} > <i id={user._id} class="fa-solid fa-trash"></i></button>
                </td>
              </tr>
                </>
              )
            })
           }
            </tbody>
          </table>
          </div>
          <div className="usertable p-2 bg-danger col-lg-6" style={{height:"350px",overflow:"hidden"}} >
          <input type="text" placeholder=" Search item" className="form-control mb-2 "/>
            <div style={{height:"320px" ,width:"100%" ,overflowX:"hidden"}} >
            <table className="table">
            <thead>
              <tr>
                <th scope="col">S.No.</th>
                <th scope="col">Item Name</th>
                <th scope="col">Group</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
           {
            allitem.map((itm,intex)=>{
              return(
                <>
                <tr>
                <th className="" scope="row">{intex+1}</th>
                <td className="p-0" >{itm.itname}</td>
                <td className="p-0" >{itm.itgroup}</td>
                <td className="p-0" > <button className="btn btn-success me-1" onClick={itemedit} id={itm._id} ><i  class="fa-solid fa-pencil"></i></button>
                     <button className="btn btn-danger"  onClick={itemdelete}> <i id={itm._id} class="fa-solid fa-trash"></i></button>
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
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
