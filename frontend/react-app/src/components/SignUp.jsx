import React, { useContext, useState } from "react";
import { Details, Base_API } from "../App";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();
  const { setCurrentUser } = useContext(Details);
  const [errors, setErrors] = useState({});
  const [signupData, setSignUpData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignUpData({ ...signupData, [name]: value });
  };

  const validateData = () => {
    let error = {};
    if (signupData.username.trim() === "") {
      error.username = "Please enter your username";
    } else {
      delete error.username;
    }
    if (signupData.email.trim() === "") {
      error.email = "Enter the email";
    } else {
      delete error.email;
    }
    if (signupData.password.trim() === "") {
      error.password = "Enter the PASSWORD";
    } else {
      delete error.password;
    }
    return error;
  };

  const createUser = async () => {
    const API = Base_API + "/users";
    try {
      let response = await axios.post(API, signupData);
      setCurrentUser(response.data);
      navigate("/home");
    } catch (err) {
      console.log(err);
      alert(err.response.data.message);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validateData();
    setErrors(errors);

    if (Object.keys(errors).length === 0) {
      createUser();
    }
  };

  return (
    <div className="signUpPage">
      <form className="signUpBox" onSubmit={handleSubmit}>
        <h1>JustIn Case</h1>
        <div className="inp-block">
          <div className="inp-user">
            <label htmlFor="username">Username: </label>
            <input
              type="text"
              name="username"
              onChange={handleChange}
              value={signupData.username}
              placeholder="type your username"
            />
          </div>
          {errors.username && <div className="err-msg">{errors.username}</div>}

          <div className="inp-user">
            <label htmlFor="email">Email: </label>
            <input
              type="text"
              name="email"
              onChange={handleChange}
              value={signupData.email}
              placeholder="type your email"
            />
          </div>
          {errors.username && <div className="err-msg">{errors.email}</div>}

          <div className="inp-pwd">
            <label htmlFor="Password">Password: </label>
            <input
              type="password"
              name="password"
              placeholder="type your Password"
              value={signupData.password}
              onChange={handleChange}
            />
          </div>
          {errors.password && <div className="err-msg">{errors.password}</div>}

          <div className="inp-btn">
            <input type="submit" value="SignUp" />
          </div>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
