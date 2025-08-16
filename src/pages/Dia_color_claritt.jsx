import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
// import authuser from '../../Store/store';

const Diacolorclarity = () => {

    let [diaColor,setDiaColor] = useState({
        color_clarity:"",
        itgroup:"",
    })
    console.log(diaColor)

    async function handlecolor(e){
        e.preventDefault()


        let form = document.querySelector("#itform")
        let err=[]
       if(!diaColor.color_clarity){
            err.push("color/clarity is empty")
       }
       if(!diaColor.itgroup || diaColor.itgroup === ''){
        err.push("select valid group")
       }
       if(err.length > 0){
        alert(err.join("\n"))
       }else{
        try {
            let data = await fetch("http://localhost:3400/colorclaritycreate",{
                method:"post",
                body:JSON.stringify(diaColor),
                headers:{
                    "Content-Type":"application/json"
                }
            })
            let res = await data.json()
           if(res.created){
            alert(res.msg)
            setDiaColor({
                color_clarity:"",  
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



    return (
        <>
            <div className='page'>
                <form className='itmform' id='itform' onSubmit={handlecolor}>
                    <h2>Color Clarity Master</h2>
                    <input type='text' placeholder='color clarity ' name='colorclarity' onChange={(e)=>{setDiaColor({...diaColor, color_clarity:e.target.value})}} className='form-control mb-3' style={{width:"300px"}}/>
                    <select  className='form-control mb-3'   name='itgroup' style={{width:"300px"}} onChange={(e)=>{setDiaColor({...diaColor, itgroup:e.target.value})}} >
                        <option value=''>Select Group</option>
                        <option value='Diamond Jewellery'>Diamond Jewellery</option>
                    </select>
                   <button type='submit' className='btn btn-success'> save </button>
                </form>

            </div>
        </>
    );
}

export default Diacolorclarity;
