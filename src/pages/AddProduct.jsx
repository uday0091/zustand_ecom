import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const AddProduct = ({setupdate , update}) => {


  let{id}= useParams()
  console.log(id)

    let [allitem , setAllItem] = useState([])
    let [itemGroup, setItemGroup] = useState()
    let [ color , setColor] = useState([])
    let [product , setProduct] = useState({
        itemname:"",
        itemgroup:"",
        image:"",
        purity:"",
        design:"",
        gwt:"",
        nwt:"",
        dwt:"",
        clr:"",
        dwt1:"",
        clr1:"",
        dwt2:"",
        clr2:"",
        swt:"",
        swt1:"",
        owt:"",
        mrp:"",
        description:""
    })

     console.log(product) 
    async function itemread(){
        let data = await fetch("http://localhost:3400/itemread")
        let res = await data.json()
        setAllItem(res.data)
        }

    async function colorclarityread(){
          let data = await fetch("http://localhost:3400/colorclarityread")
          let res = await data.json()
          setColor(res.data)
          }    
        

        function selectitem(e) {
            const selectedName = e.target.value;
            const selectedItem = allitem.find(item => item.itname === selectedName);
            const diafield = document.querySelectorAll(".diafield")
            // console.log(diafield)
            console.log(selectedItem.itgroup === "Diamond Jewellery")
            if (selectedItem) { 
              setItemGroup(selectedItem.itgroup);
              setProduct(prev => ({...prev, itemgroup: selectedItem.itgroup }));
              if(selectedItem.itgroup === "Gold Jewellery" || selectedItem.itgroup === "Silver Jewellery"){
                diafield.forEach((dia)=>{
                     dia.style.display="none";
                })
 
              }else{
                  diafield.forEach((dia)=>{
                       dia.style.display="block";
                  })
              }
            } else {
              setItemGroup(''); 
              setProduct(prev => ({...prev, itemgroup: "" }));
            }
            
          }

       function handleselect(e){
        setProduct(prev =>({...prev , itemname:e.target.value}))
       }      

       function handlecommon(e){
        selectitem(e)
        handleselect(e)
       }


       async function handleaddproduct(e){
        e.preventDefault()
        let form = document.querySelector("#productform")
        let err = []
        if(product.itemname === '' ){
           err.push("please select item") 
        }
        if(product.purity === ''){
          err.push("please select Purity")
        }
        if(!product.gwt){
          err.push("please select gross weight")
        }
        if(!product.nwt){
          err.push("please select net weight")
        }
       if(product.itemgroup === "Diamond Jewellery"){
        if(!product.dwt){
          err.push("please select dia weight")
        }
        if(!product.clr){
          err.push("please select color/clarity")
        }
        
       }

        if(err.length > 0){
          alert(err.join('\n'))
        }if(update){

          


        }else{
            let data = await fetch("http://localhost:3400/addproduct",{
              method:"post",
              body: new FormData(e.target)
            })
            
            let res = await data.json()
            // console.log(res)
            if(res.created){
              alert(res.msg)
              setProduct({
                itemname:"",
                itemgroup:"",
                image:"",
                purity:"",
                design:"",
                gwt:"",
                nwt:"",
                dwt:"",
                clr:"",
                dwt1:"",
                clr1:"",
                dwt2:"",
                clr2:"",
                swt:"",
                swt1:"",
                owt:"",
                mrp:"",
                description:""
            })

            form.reset()
            }
        }
      }

      async function readsingleproduct(){
        let form = document.querySelector('#productform')
        let savebutton = document.querySelector(".svbtn")
        console.log(form)
        try {
          let data = await fetch(`http://localhost:3400/readprodcut/${id}`)
          let res = await data.json()
          console.log(res)
          if(res.readed){

           form.itemname.value = res.singleproduct.itemname               
           form.itemgroup.value = res.singleproduct.itemgroup               
           form.purity.value = res.singleproduct.purity               
           form.design.value = res.singleproduct.design              
           form.gwt.value = res.singleproduct.gwt               
           form.nwt.value = res.singleproduct.nwt               
           form.dwt.value = res.singleproduct.dwt               
           form.dwt1.value = res.singleproduct.dwt1               
           form.dwt2.value = res.singleproduct.dwt2               
           form.clr.value = res.singleproduct.clr               
           form.clr1.value = res.singleproduct.clr1               
           form.clr2.value = res.singleproduct.clr2               
           form.owt.value = res.singleproduct.owt               
           form.description.value = res.singleproduct.description               


            setProduct({
              itemname:res.singleproduct.itemname,
            itemgroup:res.singleproduct.itemgroup,
            image:res.singleproduct.image,
            purity:res.singleproduct.purity,
            design:res.singleproduct.design,
            gwt:res.singleproduct.gwt,
            nwt:res.singleproduct.nwt,
            dwt:res.singleproduct.dwt,
            clr:res.singleproduct.clr,
            dwt1:res.singleproduct.dwt1,
            clr1:res.singleproduct.clr1,
            dwt2:res.singleproduct.dwt2,
            clr2:res.singleproduct.clr2,
            swt:res.singleproduct.swt,
            swt1:res.singleproduct.swt1,
            owt:res.singleproduct.owt,
            mrp:res.singleproduct.mrp,
            description:res.singleproduct.description
              
            })
          }

           savebutton.innerHTML="Update" 

          handlecommon(e)


        } catch (error) {
          
        }


      }
      console.log(product)
      





       


     useEffect(()=>{
        itemread()
        colorclarityread()
        if(id){
          readsingleproduct()
          
        }
     },[id])   
    return (
        <div className='page'>
            <div className='product-main row'>
            <div className='col-lg-12'>
                
            <h1 style={{display:"flex",justifyContent:'center'}}> STOCK PRODUCT</h1>
           
            <form class="row g-3" id='productform' onSubmit={handleaddproduct}>

            <div class="col-md-4">
              {/* <label for="inputState" class="form-label">Item Name</label> */}
              <select id="inputState" onChange={handlecommon}  class="form-select" name='itemname'>
                <option value="">select itme</option>
                {
                    allitem.map((item)=>{
                     return(
                        <>
                     <option value={item.itname}>{item.itname}</option>

                        </>
                     )
                    })
                }
             </select>
          </div>
  <div class="col-md-4">
    {/* <label for="inputPassword4" class="form-label">Item Group</label> */}
    <input type="text" class="form-control" name='itemgroup'  placeholder='Item Group' id="inputPassword4"  value={itemGroup} readOnly/>
  </div>
 
  <div class="col-md-2 col-6">
    {/* <label for="inputState" class="form-label">State</label> */}
    <select id="inputState" onChange={(e)=>setProduct({...product, purity:e.target.value})} class="form-select" name='purity'>
      <option value=''>Purity </option>
      <option value="14k"> 14k</option>
      <option value="18k"> 18k</option>
      <option value="20k"> 20k</option>
      <option value="22k"> 22k</option>
    </select>
  </div>
  <div class="col-lg-2 col-6">
    {/* <label for="inputAddress2" class="form-label">Design No.</label> */}
    <input type="text" class="form-control" onChange={(e)=>setProduct({...product, design:e.target.value})} name='design' id="inputAddress2" placeholder="Design No."/>
  </div>
  <div class="col-lg-2 col-6">
    {/* <label for="inputAddress2" class="form-label">Design No.</label> */}
    <input type="text" class="form-control" onChange={(e)=>setProduct({...product, gwt:e.target.value})} name='gwt' id="inputAddress2" placeholder="Gross wt."/>
  </div>
  <div class="col-lg-2 col-6">
    {/* <label for="inputAddress2" class="form-label">Design No.</label> */}
    <input type="text" class="form-control" onChange={(e)=>setProduct({...product, nwt:e.target.value})} name='nwt' id="inputAddress2" placeholder="Net wt."/>
  </div>
  <div class="col-lg-1 col-6">
    {/* <label for="inputAddress2" class="form-label">Design No.</label> */}
    <input type="text"  onChange={(e)=>setProduct({...product, dwt:e.target.value})} name='dwt' className="diafield form-select" placeholder="Dia. wt."/>
  </div>
  <div class="col-lg-1 col-6 ">
  
              {/* <label for="inputState" class="form-label">Item Name</label> */}
              <select className="diafield form-select" onChange={(e)=>setProduct({...product, clr:e.target.value})}  name='clr'>
              <option value=''>select</option>
                {
                    color.map((color)=>{
                     return(
                        <>
                     <option value={color.color_clarity}>{color.color_clarity}</option>

                        </>
                     )
                    })
                }
             </select>
        
  </div>
  <div class="col-lg-1 col-6 ">
    {/* <label for="inputAddress2" class="form-label">Design No.</label> */}
    <input type="text"  onChange={(e)=>setProduct({...product, dwt1:e.target.value})} name='dwt1' className="diafield form-select" placeholder="Dia. wt.1"/>
  </div>
  <div class="col-lg-1 col-6 ">
  
              {/* <label for="inputState" class="form-label">Item Name</label> */}
              <select className="diafield form-select" onChange={(e)=>setProduct({...product, clr1:e.target.value})}  name='clr1'>
              <option value=''>select</option>
                {
                    color.map((color)=>{
                     return(
                        <>
                     <option value={color.color_clarity}>{color.color_clarity}</option>

                        </>
                     )
                    })
                }
             </select>
        
  </div>
  <div class="col-lg-1 col-6 ">
    {/* <label for="inputAddress2" class="form-label">Design No.</label> */}
    <input type="text"  onChange={(e)=>setProduct({...product, dwt2:e.target.value})} name='dwt2' className="diafield form-select" placeholder="Dia. wt.2"/>
  </div>
  <div class="col-lg-1 col-6 ">
  
              {/* <label for="inputState" class="form-label">Item Name</label> */}
              <select className="diafield form-select" onChange={(e)=>setProduct({...product, clr2:e.target.value})}   name='clr2'>
              <option value=''>select</option>
                {
                    color.map((color)=>{
                     return(
                        <>
                     <option value={color.color_clarity}>{color.color_clarity}</option>

                        </>
                     )
                    })
                }
             </select>
        
  </div>
  <div class="col-lg-2 col-6 ">
    {/* <label for="inputAddress2" class="form-label">Design No.</label> */}
    <input type="text" class="form-control" onChange={(e)=>setProduct({...product, swt:e.target.value})} name='swt' id="inputAddress2" placeholder="Stone wt."/>
  </div>
  <div class="col-lg-2 col-6 ">
    {/* <label for="inputAddress2" class="form-label">Design No.</label> */}
    <input type="text" class="form-control" onChange={(e)=>setProduct({...product, swt1:e.target.value})} name='swt1' id="inputAddress2" placeholder="Stone wt.2"/>
  </div>
  <div class="col-lg-2 col-6 ">
    {/* <label for="inputAddress2" class="form-label">Design No.</label> */}
    <input type="text" class="form-control" onChange={(e)=>setProduct({...product, owt:e.target.value})} name='owt' id="inputAddress2" placeholder="Other wt."/>
  </div>
  <div class="col-lg-2 col-6">
    {/* <label for="inputAddress2" class="form-label">Design No.</label> */}
    <input type="text" class="form-control" onChange={(e)=>setProduct({...product, mrp:e.target.value})} name='mrp' id="inputAddress2" placeholder="MRP"/>
  </div>
  <div class="col-lg-4">
    {/* <label for="inputAddress" class="form-label">Item Image</label> */}
    <input type="file" class="form-control" onChange={(e)=>setProduct({...product, iamge:e.target.files[0]})} name='image' id="inputAddress" placeholder="Item Image"/>
  </div>
  <div class="col-12">
    <label for="inputAddress2" class="form-label">Description</label>
    <textarea className='col-lg-12 form-control' onChange={(e)=>setProduct({...product, description:e.target.value})} style={{height:"100px"}} name='description'></textarea>
  </div>
  <div class="col-12">
    <button type="submit" class="btn btn-primary svbtn">Save</button>
  </div>
</form>

            </div>
            </div>            
        </div>
    );
}

export default AddProduct;
