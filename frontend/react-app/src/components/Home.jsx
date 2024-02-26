import React, { useContext } from "react";
import { MdOutlineAddCircle } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { AiFillHeart } from "react-icons/ai";
import { BiSolidDislike } from "react-icons/bi";
import { Details } from "../App";

const Home = () => {
  const navigate = useNavigate();
  const { postDetails } = useContext(Details);

  return (
    <>
      <div className="addPost" onClick={() => navigate("/newpost")}>
        <MdOutlineAddCircle size="50px" />
      </div>

      <div className="body">
        {postDetails.length > 0
          ? postDetails.map((post) => {
              return (
                <div className="container" key={post.postid} id={post.postid}>
                  <p>{post.content}</p>
                  <div className="like-dis">
                    <span className="likes">
                      <AiFillHeart size="30px" fill="grey" />
                      <p>{post.likes_count}</p>
                    </span>
                    <span className="disLikes">
                      <BiSolidDislike size="30px" fill="grey" />
                      <p>{post.dislikes_count}</p>
                    </span>
                  </div>
                </div>
              );
            })
          : "Loading..."}
      </div>
    </>
  );
};

export default Home;
