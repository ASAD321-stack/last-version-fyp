import React, { useState,useEffect } from "react"
import { useNavigate,Link } from 'react-router-dom';
import './login-.css';
import Home0 from "./home0"


const Signup = () => {

  const navigate = useNavigate();

  const [user, setUser] = useState({
    username: "", email: "", password: "", cpassword: "",number:""
  });
  const [formError , setFormError] = useState({});
	const [isSubmit , setIsSubmit] = useState(false);
  let name, value;


  const handleInputs = (e) => {
    name = e.target.name;
    value = e.target.value;

    setUser({ ...user, [name]: value })
  }
  const PostData = async (e) => {
    e.preventDefault();
    const { username, email, password, cpassword ,number } = user;
    const res = await fetch("/register", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, email, password, cpassword, number })
    });


    setFormError(validate(user));
	  setIsSubmit(true);

    // const data = await res.json();

    // if (res.status === 422 || !data) {
    //   window.alert("invalid Registration");
    //   console.log("Invalid Registration");

    // } else {
    //   window.alert("Registration Successfull");
    //   console.log("Registration successfull");
    //   navigate('/login');

    // }

    res.json();
			  console.log(res.status);
			 if(res.status===422||!res)
			 {
				window.confirm("Email is Already Registed");
				console.log("Invalid Registration");
				
			 }else if (res.status === 400){
				 
			 }
			 else
			 {
				window.confirm("Registration Successfull");
				console.log("Registration successfull");	
				navigate('/login');
			 }
  }
  useEffect(() => {
    console.log(formError);
    if(Object.keys(formError).length === 0 && isSubmit){
      console.log(user);
    }
  },[formError]);
    const validate = (values) => {
      const errors = {};
      const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
     if(!values.name)
     {
       errors.name = "Name is required";
     }
      if(!values.email)
      {
        errors.email = "Email is required";
      }else if(!regex.test(values.email)) {
        errors.email ="Not a valid Email";
      }
      if(!values.password)
      {
        errors.password = "Password is required";
      } else if (values.password < 4) {
      errors.password = "Password must be more than 10 characters";
      } else if (values.password > 10) {
      errors.password = "Password must be more than 4 characters";
      }
      if(values.password !== values.cpassword)
      {
        errors.cpassword = "Password not Match";
      }
      if(!values.number)
      {
        errors.number = "Number is Required";
      }

      return errors;
    }


  return (
    <>
    <Home0/>
    <div className="hub">
      <section id="form-3" >
        <div className="container">
          <div className=" row signuprow">

            <div className="col-md-7 pic-sec">

            </div>
            <div className="col-md-5 col-sm-12 col-sign-2">
              <img src="./farrgo-removebg-preview.png" width="200px" alt="" />

              <h4>Sign up</h4>
              <form method="POST">
                <div className="form-group">
                  <label for="Name">Name</label>
                  <input type="text" name="username" id="name" className="form-control" placeholder="username"
                    value={user.username}
                    onChange={handleInputs}>
                  </input>
                </div>
                <div className="error">{formError.username}</div>
                <div className="form-group">
                  <label for="Email">Email</label>
                  <input type="email" name="email" id="email" className="form-control"
                    value={user.email}
                    onChange={handleInputs}
                    placeholder="email"></input>
                </div>
                <div className="error">{formError.email}</div>
                <div className="form-group">
                  <label for="password">Password</label>
                  <input type="password" name="password" id="password" className="form-control"
                    value={user.password}
                    onChange={handleInputs}
                    placeholder="password"></input>
                </div>
                <div className="error">{formError.password}</div>
                <div className="form-group">
                  <label for="confirm-password">confirm Password</label>
                  <input type="password" name="cpassword" id="cpassword" className="form-control"
                    value={user.cpassword}
                    onChange={handleInputs}
                    placeholder=" Comfirm password"></input>
                </div>
                <div className="error">{formError.cpassword}</div>
                <div className="form-group">
									<label for="password">Phone No:</label>
									<input type="text" name="number" id="number" className="form-control"
										value={user.number}
										onChange={handleInputs} 
										placeholder="Enter Contact No."
										required></input>
								</div>

                <div className="feilds">
                  <div className="form-group">
                    <input type="submit" name="signUp" id="signUp" value="SignUp"
                      onClick={PostData} className="btn float-right login_btn"></input>
                  </div>
                </div>

                <div className="card-footer">
									<div className="d-flex justify-content-center links">
										Already have an account?<Link to="/login">Log in</Link>
									</div>
									<div className="d-flex justify-content-center">
										<a href="#">Forgot your password?</a>
									</div>
								</div>

              </form>

            </div>
          </div>
        </div>
      </section>

    </div>
    </>
  )
}

export default Signup
