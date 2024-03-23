import React, { useContext, useEffect, useState } from "react";
import { Details } from "../App";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Base_API } from "../App";

const NewPost = () => {
  const navigate = useNavigate();
  const { postDetails, setFlag } = useContext(Details);
  const [error, setError] = useState({});
  const [formData, setFormData] = useState({
    userid: 11, // For Now I have given default userid
    content: "",
  });



  const handleChange = (e) => {
    let { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const pushPost = async () => {
    try {
      const postResponse = await axios.post(Base_API + "/posts", formData);
      if (postResponse.status === 201) {
        console.log("Post Created");
        setFlag((prev) => !prev);
        navigate("/");
        //  Have to update the users collection with the same post_id
      }
    } catch (err) {
      console.log({ Error: err.message });
    }
  };

  const validate = (data) => {
    let error = {};
    if (!data.userid) {
      error.userid = "Please enter the User ID";
    } else {
      delete error.userid;
    }
    if (data.content.trim() === "") {
      error.content = "Please enter the Joke";
    } else {
      delete error.content;
    }
    return error;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validate(formData);
    setError(errors);
    if (Object.keys(errors).length === 0) {
      pushPost();
    }
  };

  return (
    <div className="postFormBlk">
      {postDetails.length > 1 ? (
        <form className="postForm" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="content"> Type your Joke here: </label>
            <input
              type="text"
              placeholder="TYPE THE JOKE..."
              name="content"
              value={formData.content}
              onChange={handleChange}
            />
            {error.content ? error.content : ""}
            <label htmlFor="userid"> User ID: </label>
            <input
              type="number"
              name="userid"
              value={formData.userid}
              onChange={handleChange}
            />
            {error.userid ? error.userid : ""}
          </div>
          <input type="submit" value="Submit" id="postSubmitBtn" />
        </form>
      ) : (
        "Loading..."
      )}
    </div>
  );
};

export default NewPost;
