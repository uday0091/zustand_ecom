import { useEffect, useState } from 'react'
import './App.css'
import{BrowserRouter  ,Routes ,Route} from "react-router-dom"
import Login from './pages/Login'
import Signup from './pages/Signup'
import Dashboard from './pages/Dashboard'
import Nav from './components/Nav'
import authuser from '../Store/store'
import ItemMaster from './pages/ItemMaster'
import AddProduct from './pages/AddProduct'
import Diacolorclarity from './pages/Dia_color_claritt'
import Footer from './components/Footer'
import Home from './pages/Home'
import ProductInfo from './pages/Product_info'
import Cartitem from './pages/Cartitem'
import Order from './pages/Order'
import AllProductList from './pages/AllProductList'
function App() {

let {user, auth} = authuser()

// console.log(user)

useEffect(()=>{
  auth()
},[])

let [cartlength , setcartlength ]=useState(0)
let [update , setupdate]= useState(false)
 return(
  <>
  <BrowserRouter>
  <Nav cartlength={cartlength} />
 
  
    <Routes>
      <Route path='/' element={<Login/>}/>
      <Route path='/home' element={<Home/>}/>
      <Route path='/signup' element={ user?.user? <Signup />:<Login/> } />
      <Route path='/dashboard' element={ user?.user?.role =="admin" ? <Dashboard/>:<Home/>}/>
      <Route  path='/item_master' element={ user?.user? <ItemMaster/>:<Login/>}/>
      <Route  path='/item/:id' element={ user?.user? <ItemMaster/>:<Login/>}/>
      <Route  path='/addproduct' element={ user?.user? <AddProduct/>:<Login/>}/>
      <Route  path='/diacolor' element={ user?.user? <Diacolorclarity/>:<Login/>}/>
      <Route  path='/product/:id' element={ user?.user? <ProductInfo/>:<Login/>}/>
      <Route  path='/cartitem' element={ user?.user? <Cartitem cartlength={cartlength} setcartlength={setcartlength}  />:<Login/>}/>
      <Route path='/userorder' element={user?.user? <Order/>:<Login/>} />
      <Route path='/allproductlist' element={ user?.user?.role =="admin" ? <AllProductList setupdate={setupdate}/>:<Home/>}/>
      <Route path='/addproduct/:id' element={ user?.user?.role =="admin" ? <AddProduct update={update} setupdate={setupdate}/>:<Home/>}/>


    </Routes>
    {/* <Footer/> */}
  </BrowserRouter>



  </>
 )


}

export default App
