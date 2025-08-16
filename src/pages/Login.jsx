import { React, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import authuser from '../../Store/store';


const Login = () => {

  let {auth}= authuser()

  

  let navigate = useNavigate()
  let[login, setLogin]= useState({
      email:"",
      password:"",
  })
  
  console.log(login)

  async function handlesubmit(e){
    e.preventDefault()

    let err = []
    if(!login.email){
      err.push("please enter your email")
    }
    if(!login.password){
      err.push("please enter your password")
    }
    if(err.length>0){
      alert(err.join("\n"))

    }
    else{

      try {
        let data = await fetch("http://localhost:3400/login",{
          method:"post",
          body:JSON.stringify(login),
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        })
        let res = await data.json()
        if(res.valid){
          alert(res.message)
          localStorage.setItem("user",JSON.stringify(res))
          navigate("/home")
          auth()
        }else{
          alert(res.message)
          navigate('/')
        }


      } catch (error) {
        
      }

    }

  }

    return (
        <div className='page '>
          <section class="vh-100   loginpage ">
  <div class="container py-0 h-100">
    <div class="row d-flex justify-content-center align-items-center h-100">
      <div class="col col-xl-10">
        <div class="card" style={{borderRadius: "1rem"}}>
          <div class="row g-0">
            <div class="col-md-6 col-lg-5 d-none d-md-block">
              <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/img1.webp"
                alt="login form" class="img-fluid"  style={{borderRadius:"1rem 0 0 1rem"}} />
            </div>
            <div class="col-md-6 col-lg-7 d-flex align-items-center">
              <div class="card-body p-4 p-lg-5 text-black">

                <form onSubmit={handlesubmit}>

                  <div class="d-flex align-items-center mb-1 pb-1">
                    <i class="fas fa-cubes fa-2x me-3" style={{color: "ff6219"}}></i>
                    <span class="h1 fw-bold mb-0">Logo</span>
                  </div>

                  <h5 class="fw-normal mb-1 pb-3" style={{letterSpacing:"1px"}}>Sign into your account</h5>

                  <div data-mdb-input-init class="form-outline mb-1">
                    <input type="email" id="form2Example17" name='email' onChange={(e)=>{setLogin({...login, email:e.target.value})}} class="form-control form-control-lg" />
                    <label class="form-label"  for="form2Example17">Email address</label>
                  </div>

                  <div data-mdb-input-init class="form-outline mb-1">
                    <input type="password" id="form2Example27" name='password' onChange={(e)=>{setLogin({...login , password:e.target.value})}} class="form-control form-control-lg" />
                    <label class="form-label" for="form2Example27">Password</label>
                  </div>

                  <div class="pt-1 mb-1">
                    <button data-mdb-button-init data-mdb-ripple-init class="btn btn-dark btn-lg btn-block" type="submit">Login</button>
                  </div>

                  <a class="small text-muted" href="#!">Forgot password?</a>
                  <p class="mb-2 pb-lg-2" style={{color: "#393f81"}}>Don't have an account? <Link href="#!"
                      style={{color: "#393f81"}}>Register here</Link></p>
            
                </form>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
        </div>
    );
};





export default Login;
