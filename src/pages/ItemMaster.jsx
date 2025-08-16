import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import authuser from '../../Store/store';

const ItemMaster = () => {
    let navigate = useNavigate()
    let {update} = authuser()
    let {id} = useParams()

    console.log(update)


    let [item_Master,setItem_Master] = useState({
        itname:"",
        itgroup:"",
    })

    async function handleitemsubmit(e){
        e.preventDefault()
        // console.log(form)
        let form = document.querySelector("#itform")
        let err=[]
       if(!item_Master.itname){
            err.push("enter item name")
       }
       if(!item_Master.itgroup || item_Master.itgroup === ''){
        err.push("select valid group")
       }
       if(err.length > 0){
        alert(err.join("\n"))
       }else{
        if(update){
            console.log("update")
            let data = await fetch(`http://localhost:3400/itemupdate/${id}`,{
                    method:"post",
                    body:JSON.stringify(item_Master),
                    headers:{
                        "Content-Type":"application/json"
                    }
                })
                    let res = await data.json()
                    if(res.updated){
                        alert(res.msg)
                        navigate('/dashboard')
                    }

        }else{
            try {
                let data = await fetch("http://localhost:3400/itemcreate",{
                    method:"post",
                    body:JSON.stringify(item_Master),
                    headers:{
                        "Content-Type":"application/json"
                    }
                })
                let res = await data.json()
               if(res.created){
                alert(res.msg)
                setItem_Master({
                    itname:"",  
                    itgroup:"",
                })
                form.reset()
                navigate('/dashboard')
    
               }else{
                alert(res.msg)
               }
            } catch (error) {
                console.log(error)
            }
        }

        
    }
    }
    async function oneitem (){
        let form = document.querySelector("#itform")

        let data = await fetch(`http://localhost:3400/item/${id}`)
        let res = await data.json()
        console.log(res.item)
        if(res.readed){

              form.itname.value = res.item.itname,
              form.itgroup.value = res.item.itgroup,

            setItem_Master({
                itname: res.item.itname,
                itgroup: res.item.itgroup,
              });
              
// ..............AGAR HUME IS LOOP WALE CODE KO USE KRNA HAI TO API SE _ID NH LE KR AANI HAI .................
            //   for (const key in res.item) {
            //     form[key].value = res.item[key];
            //   }
            }
        }

    useEffect( ()=>{
      
        if(id){
            oneitem()
        }
    },[id])
    console.log(item_Master)
    return (
        <>
            <div className='page'>
                <form className='itmform' id='itform' onSubmit={handleitemsubmit}>
                    <h2>Item Master</h2>
                    <input type='text' placeholder='item name ' name='itname' onChange={(e)=>{setItem_Master({...item_Master, itname:e.target.value})}} className='form-control mb-3' style={{width:"300px"}}/>
                    <select  className='form-control mb-3'   name='itgroup' style={{width:"300px"}} onChange={(e)=>{setItem_Master({...item_Master, itgroup:e.target.value})}} >
                            
                        <option value=''>default select</option>
                        <option value='Gold Jewellery'>Gold Jewellery</option>
                        <option value='Silver Jewellery'>Silver Jewellery</option>
                        <option value='Diamond Jewellery'>Diamond Jewellery</option>
                    </select>
                   <button type='submit' className='btn btn-success'> save </button>
                </form>

            </div>
        </>
    );
}

export default ItemMaster;
