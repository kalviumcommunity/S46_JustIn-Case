import React, { useContext, useState } from "react";
import { Details } from "../App";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Base_API } from "../App";

const NewPost = () => {
  const navigate = useNavigate();
  const { postDetails, setFlag, currentUser } = useContext(Details);
  const [error, setError] = useState({});
  const [content, setContent] = useState("");

  const handleChange = (e) => {
    let { value } = e.target;
    setContent(value);
  };

  const pushPost = async () => {
    try {
      const postResponse = await axios.post(Base_API + "/posts", {
        content: content,
        userid: currentUser.userid,
      });
      if (postResponse.status === 201) {
        console.log("Post Created");
        setFlag((prev) => !prev);
        navigate("/home");
        //  Have to update the users collection with the same post id
      }
    } catch (err) {
      console.log({ Error: err.message });
    }
  };

  const validate = (data) => {
    let error = {};
    if (data.trim() === "") {
      error.content = "Please enter the Joke";
    } else {
      delete error.content;
    }
    return error;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validate(content);
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
            <textarea
              style={{ maxWidth: "300px", minWidth: "300px" }}
              type="text"
              placeholder="TYPE THE JOKE..."
              name="content"
              value={content}
              onChange={handleChange}
            />
            {error.content ? error.content : ""}
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
