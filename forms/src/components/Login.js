import React, { useState,useEffect } from "react";
import { useNavigate } from "react-router";
import { NavLink } from "react-router-dom";
import { Navbar, Dropdown } from 'react-bootstrap';
import { Link } from "react-router-dom";
import Home0 from "./home0"

import './login-.css';


const Login = () => {
	const navigate = useNavigate();

	const [user, setUser] = useState({
		email: "", password: ""
	});
	const [formError, setFormError] = useState({});
	const [isSubmit, setIsSubmit] = useState(false);

	let name, value;
	const handleInputs = (e) => {
		name = e.target.name;
		value = e.target.value;

		setUser({ ...user, [name]: value })
	}

	const loginUser = async (e) => {
		const { email, password } = user
		e.preventDefault();
		const res = await fetch('/login', {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			credentials: 'include',
			body: JSON.stringify({
				email, password
			})
		});

		setFormError(validate(user));
		setIsSubmit(true);
		res.json();
		console.log(' catching error');
		console.log(res.status);
		if (res.status === 400) {
			window.alert("Invalid Credentials");
		}
		else if(res.status=== 422)
		{
		
		}
		else {
			window.alert("login SuccessFully");
			navigate('/home');
		}
	}

	useEffect(() => {
		console.log(formError);
		if (Object.keys(formError).length === 0 && isSubmit) {
			console.log(user);
		}
	}, [formError]);
	const validate = (values) => {
		const errors = {};
		const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
		if (!values.email) {
			errors.email = "Email is required";
		} else if (!regex.test(values.email)) {
			errors.email = "Not a valid Email";
		}
		if (!values.password) {
			errors.password = "Password is required";
		}
		return errors;
	}



	return (
<>
<Home0/>
		<div className="hub">
			<section id="form-3">
				<div className="container ">
					<div className="row login-row">

						<div className="col-md-6 col-sm-12 pic-sec">

						</div>
						<div className="col-md-6 col-sm-12 col-login-2">
							<img src="./farrgo-removebg-preview.png" width="200px" alt="" />
							<h4>Log in</h4>

							<form method="POST">

								<div className="form-group">
									<label for="Email">Email</label>
									<input type="email" name="email" id="email" className="form-control"
								        	value={user.email}
											onChange={handleInputs}
										placeholder="email"
										required></input>
								</div>
								<div className="form-group">
									<label for="password">Password</label>
									<input type="password" name="password" id="password" className="form-control"
										value={user.password}
										onChange={handleInputs} 
										placeholder="password"
										required></input>
								</div>
								<div className="error">{formError.password}</div>
								<div className="feilds">
									<div className="form-group">
										<input type="submit" value="Login"
											onClick={loginUser}
											className="btn float-right login_btn"></input>
									</div>
								</div>
								<div className="card-footer">
									<div className="d-flex justify-content-center links">
										Don't have an account?<Link to="/SignUp">Sign Up</Link>
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

export default Login
