import React, { useContext, useState } from "react";
import axios from "axios";
import "./FormStyles.css";
import { Details, Base_API } from "../App";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const { setCurrentUser } = useContext(Details);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };

  const validateData = () => {
    let error = {};
    if (loginData.username.trim() === "") {
      error.username = "Please enter your username";
    } else {
      delete error.username;
    }
    if (loginData.password.trim() === "") {
      error.password = "Enter the PASSWORD";
    } else {
      delete error.password;
    }
    return error;
  };

  const verifyUser = async () => {
    const API = `${Base_API}/users/login`;

    try {
      const response = await axios.post(API, loginData);
      if (response.data.message === "Login Successful") {
        setCurrentUser(response.data.user);
        navigate("/home");
      }
    } catch (err) {
      console.log(err);
      alert(
        "Invalid credentials. Please check your username and password and try again"
      );
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validateData();
    setErrors(errors);

    if (Object.keys(errors).length === 0) {
      verifyUser();
    }
  };

  return (
    <div className="loginPage">
      <form className="loginBox" onSubmit={handleSubmit}>
        <h1>JustIn Case</h1>
        <div className="inp-block">
          <div className="inp-user">
            <label htmlFor="username">Username: </label>
            <input
              type="text"
              name="username"
              onChange={handleChange}
              value={loginData.username}
              placeholder="type your username"
            />
          </div>
          {errors.username && <div className="err-msg">{errors.username}</div>}
          <div className="inp-pwd">
            <label htmlFor="Password">Password: </label>
            <input
              type="password"
              name="password"
              placeholder="type your Password"
              value={loginData.password}
              onChange={handleChange}
            />
          </div>
          {errors.password && <div className="err-msg">{errors.password}</div>}

          <div className="inp-btn">
            <input type="submit" value="Login" />
            <p className="inp-signup">
              New to the page? <Link to="/signup">Signup </Link>
            </p>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
