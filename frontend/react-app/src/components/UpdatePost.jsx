import  { useContext, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Details, Base_API } from "../App";
import axios from "axios";

const UpdatePost = () => {
  const { postDetails, setFlag } = useContext(Details);
  const { id } = useParams();
  const [error, setError] = useState({});
  const [post, setPost] = useState(
    postDetails.filter((e) => e.postid == id)[0]
  );
  const navigate = useNavigate();

  const handleChange = (e) => {
    let { name, value } = e.target;
    setPost({
      ...post,
      [name]: value,
    });
  };

  const validate = (data) => {
    let error = {};
    if (data.content.trim() === "") {
      error.content = "Please enter the Joke";
    } else {
      delete error.content;
    }
    return error;
  };

  const updatePost = async () => {
    try {
      const updateResponse = await axios.put(
        Base_API + `/posts/${post.postid}`,
        post
      );
      if (updateResponse.status == 200) {
        console.log("Post Updated");
        setFlag((prev) => !prev);
        navigate("/");
      }
    } catch (err) {
      console.log({ Error: err.message });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validate(post);
    setError(errors);
    if (Object.keys(errors).length === 0) {
      updatePost();
    }
  };

  return (
    <div className="update-post">
      {postDetails.length > 0 ? (
        <form className="postForm" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="content"> Edit your Joke here: </label>
            <textarea
              style={{ height: "150px", width: "390px", padding: "20px" }}
              type="text"
              placeholder=""
              name="content"
              value={post.content}
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

export default UpdatePost;
