import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import authuser from '../../Store/store';
import useCartStore from '../../Store/addtocart';

const Nav = ({cartlength}) => {


const cartItems = useCartStore((state) => state.cartItems);


let newcartlength = 0;
function getquantity(e){
  if(e){
    cartlength.map((lngth)=>{
      return newcartlength += lngth.quantity
    })
  }
 
}

getquantity(cartlength)


console.log(newcartlength)
// let totalquantity = 0
// function quantityofproduct (){
//    cartItems.map((qnty)=>{
//     return totalquantity += qnty.quantity
//    })
// }
// console.log(totalquantity)
// quantityofproduct()

  let navigate = useNavigate()
let {logout,user} = authuser()
function handlelogout(){
  let sure = confirm("you want to logout")
    if(sure){
  logout()
  setTimeout(() => {
    navigate('/')
  }, 100)
}
 
  // localStorage.setItem("")

 }
 
 function handleuser(){
  let userinfo = document.querySelector(".userinfo")
  // console.log(userinfo)
  userinfo.classList.toggle("userinfo1")
  }


    return (
        <div>
            <nav class="navbar navbar-expand-lg bg-body-tertiary">
  <div class="container-fluid">
    <a class="navbar-brand" href="#">Navbar</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNavDropdown">
      <ul class="navbar-nav">
        <li class="nav-item fs-5">
          <Link class="nav-link active" aria-current="page" to="/home">Home</Link>
        </li>
        <li class="nav-item fs-5">
        {
        user?.user?.role == "admin"?<Link class="nav-link" to="/dashboard">Dashboard</Link>:''

        }
        </li>
        <li class="nav-item fs-5">
          <Link class="nav-link" to="/gallery"> Gallery
          {/* <li><Link>Ladies Ring</Link></li> */}
      
          </Link>
        </li>
        
        {
          user?.user?<li class="nav-item fs-5 ">
          <button class="nav-link" onClick={handlelogout}>Logout</button>
        </li>: null
        }
        {/* <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Dropdown link
          </a>
          <ul class="dropdown-menu">
            <li><a class="dropdown-item" href="#">Action</a></li>
            <li><a class="dropdown-item" href="#">Another action</a></li>
            <li><a class="dropdown-item" href="#">Something else here</a></li>
          </ul>
        </li> */}
       
      </ul>
      
    </div>    
  </div>
            
          <Link class="nav-link text-dark px-3 " to="/cartitem">
          <i class="fa-solid fa-cart-shopping fs-3" style={{position:"relative"}} > <span className='text-danger' style={{position:"absolute",left:"10px",top:"-12px"}}>{newcartlength}</span> </i> 
          </Link>

          <div className='user' onClick={handleuser} style={{height:"50px",width:"50px", background:"gray",display:"flex",justifyContent:"center",alignItems:"center",borderRadius:"50%"}}>

             <i class="fa-solid fa-user text-dark fs-3"></i>

          </div>
              
           


 
</nav>
  {
    user?.user?<div className='userinfo' style={{height:"160px",width:"150px", borderRadius:"10px", background:'lightgray',position:"absolute",right:"10px",padding:"10px"}}>
        <h3 className='text-dark'>{user.user.name}</h3>
        <Link to='/userorder'>
           <button className='fs-5 btn btn-primary'>Order</button>
        </Link>

        
         <button className=' mt-3 btncolor ' onClick={handlelogout}>Logout</button>
        
       {
        
       }

      
       
        
</div>:null
  }

        </div>
        
    );
}

export default Nav;
