import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {

let navigate = useNavigate()

  let [user, setUser] = useState({
    name: "",
    lastname: "",
    email: "",
    password: "",
    mobile: "",
    role: "",
    avtar: "",
    prewievurl:
      "https://static.vecteezy.com/system/resources/previews/019/879/198/non_2x/user-icon-on-transparent-background-free-png.png",
  });

  console.log(user)

  let inputclick = useRef(null);

  let imgclick = () => {
    inputclick.current.click();
  };

  async function haldlesignup(e) {
    let err = [];
    e.preventDefault();

    if (!user.email) {
      err.push("Email is Required!");
    }
    if (!user.password) {
      err.push("password is Required!");
    }
    if (!user.name) {
      err.push("user name  is Required!");
    }
    if(!user.avtar){
      err.push(" selete the image")
    }
    if(!user.role || user.role == ""){
      err.push(" selete the role")
    }

    if (err.length > 0) {
      alert(err.join("\n"));
    } else {
      let data = await fetch("http://localhost:3400/signup", {
        method: "post",
        body: new FormData(e.target),
      });
      let res = await data.json();
      if(res.created){
        alert(res.message)
        e.target.reset()
        setUser({
          name: "",
          lastname: "",
          email: "",
          password: "",
          mobile: "",
          role: "",
          avtar: "",
          prewievurl:
            "https://static.vecteezy.com/system/resources/previews/019/879/198/non_2x/user-icon-on-transparent-background-free-png.png",
        })
        navigate('/dashboard')

      }else{
        alert(res.message)
      }
    }
  }

  return (
    <div className="">
      {/* <!-- Section: Design Block --> */}
      <section class="text-center text-lg-start signup_page">
        {/* <!-- Jumbotron --> */}
        <div class="container ">
          <div class="row g-0 align-items-center">
            <div class="col-lg-6 mb-5 mb-lg-0">
              <div class="card cascading-right bg-body-tertiary">
                <div class="card-body p-5 shadow-5 text-center">
                  <h2 class="fw-bold mb-5">Sign up now</h2>
                  <form className="mt-0" onSubmit={haldlesignup}  >
                    {/* <!-- 2 column grid layout with text inputs for the first and last names --> */}
                    <div class="row">
                    {/* name input */}
                      <div class="col-md-6 mb-2">
                        <div data-mdb-input-init class="form-outline">
                          <input
                            type="text"
                            name="name"
                            onChange={(e) => {
                              setUser({ ...user, name: e.target.value });
                            }}
                            id="form3Example1"
                            class="form-control"
                          />
                          <label class="form-label" for="form3Example1">
                            First name
                          </label>
                        </div>
                      </div>
                      <div class="col-md-6 mb-2">
                        <div data-mdb-input-init class="form-outline">
                          <input
                            type="text"
                            name="lastname"
                            onChange={(e) => {
                              setUser({ ...user, lastname: e.target.value });
                            }}
                            id="form3Example2"
                            class="form-control"
                          />
                          <label class="form-label" for="form3Example2">
                            Last name
                          </label>
                        </div>
                      </div>
                      {/* email input */}
                      <div data-mdb-input-init class="form-outline mb-1" className="col-lg-6">
                      <input
                        type="email"
                        name="email"
                        onChange={(e) => {
                          setUser({ ...user, email: e.target.value });
                        }}
                        id="form3Example3"
                        class="form-control"
                      />
                      <label class="form-label" for="form3Example3">
                        Email address
                      </label>
                      
                    </div>

                    {/* <!-- Password input --> */}
                    <div data-mdb-input-init class="form-outline mb-1" className="col-lg-6">
                      <input
                        type="password"
                        name="password"
                        onChange={(e) => {
                          setUser({ ...user, mobile: e.target.value });
                        }}
                        id="form3Example4"
                        class="form-control"
                      />
                      <label class="form-label" for="form3Example4">
                        Password
                      </label>
                    </div>
                    <div data-mdb-input-init class="form-outline mb-1" className="col-lg-6">
                      <input
                        type="number"
                        name="mobile"
                        onChange={(e) => {
                          setUser({ ...user, password: e.target.value });
                        }}
                        id="form3Example4"
                        class="form-control"
                      />
                      <label class="form-label" for="form3Example4">
                        Mobile No.
                      </label>
                    </div>

                    <div data-mdb-input-init class="form-outline mb-1" className="col-lg-6">
                      <select onChange={(e) => {
                          setUser({ ...user, role: e.target.value });
                        }}
                        id="form3Example4"
                        class="form-control"
                        name="role"
                        >
                        <option value=''>Select</option>
                        <option value='admin'>Admin</option>
                        <option value='user'>User</option>
                      </select>
                      <label class="form-label" for="form3Example4">
                        Role
                      </label>
                    </div>

               </div>

                   
                   
                    

                    {/* <!-- image input --> */}
                    <div
                      data-mdb-input-init
                      class="form-outline mb-1 imgdiv"
                      onClick={imgclick}
                    >
                      <img
                        src={user.prewievurl}
                        alt="avtar"
                        className=" form-label"
                        style={{
                          height: "100px",
                          width: "100px",
                          borderRadius: "50%",
                        }}
                      />
                      <input
                        type="file"
                        name="avtar"
                        ref={inputclick}
                        onChange={(e) => {
                          const file = e.target.files[0];
                          if (file) {
                            const previewURL = URL.createObjectURL(file);
                            setUser({
                              ...user,
                              avtar: file,
                              prewievurl: previewURL,
                            });
                          }
                        }}
                        class="form-control  "
                        style={{ display: "none" }}
                      />
                      {/* <label class="form-label" for="form3Example5">photo</label> */}
                    </div>

                    {/* <!-- Submit button --> */}
                    <button
                      type="submit"
                      data-mdb-button-init
                      data-mdb-ripple-init
                      class="btn btn-primary btn-block mb-2"
                    >
                      Sign up
                    </button>

                    {/* <!-- Register buttons --> */}
                    {/* <div class="text-center">
                <p>or sign up with:</p>
                <button  type="button" data-mdb-button-init data-mdb-ripple-init class="btn btn-link btn-floating mx-1">
                  <i class="fab fa-facebook-f"></i>
                </button>

                <button  type="button" data-mdb-button-init data-mdb-ripple-init class="btn btn-link btn-floating mx-1">
                  <i class="fab fa-google"></i>
                </button>

                <button  type="button" data-mdb-button-init data-mdb-ripple-init class="btn btn-link btn-floating mx-1">
                  <i class="fab fa-twitter"></i>
                </button>

                <button  type="button" data-mdb-button-init data-mdb-ripple-init class="btn btn-link btn-floating mx-1">
                  <i class="fab fa-github"></i>
                </button>
              </div> */}
                  </form>
                </div>
              </div>
            </div>

            <div class="col-lg-6 mb-2 mb-lg-0">
              <img
                src="https://mdbootstrap.com/img/new/ecommerce/vertical/004.jpg"
                class="w-75 rounded-4 shadow-4"
                alt=""
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Signup;
