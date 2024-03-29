import { useContext, useEffect, useState } from "react";
import { MdOutlineAddCircle } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { AiFillHeart } from "react-icons/ai";
import { BiSolidDislike } from "react-icons/bi";
import { Details, Base_API } from "../App";
import { RiEdit2Line } from "react-icons/ri";
import { MdDelete } from "react-icons/md";
import axios from "axios";
import Cookies from "js-cookie";
import FilterPostsByUser from "./FilterPostsByUser";

const Home = () => {
  const { postDetails, setFlag, currentUser, setCurrentUser, displayUsers } =
    useContext(Details);
  const navigate = useNavigate();
  const [displayPosts, setDisplayPosts] = useState(postDetails);

  useEffect(() => {
    const handledisplayPosts = () => {
      if (displayUsers == "all" && postDetails.length > 0) {
        setDisplayPosts(postDetails);
      } else {
        setDisplayPosts(
          postDetails.filter((post) => post.userid == displayUsers)
        );
      }
    };
    handledisplayPosts();
  }, [displayUsers, postDetails]);

  // useEffect(() => {
  //   console.log(displayPosts);
  // }, [displayPosts]); //delete when pushing

  const deletePost = async (e) => {
    try {
      const response = await axios.delete(Base_API + `/posts/${e}`);
      if (response.status == 200) {
        setFlag((prev) => !prev);
        console.log("Post Deleted");
      }
    } catch (err) {
      console.log({ Error: err.message });
    }
  };

  const handleLogin = async (e) => {
    if (e.target.textContent === "Login/SignUp") {
      navigate("/");
    } else {
      if (confirm("Are you sure to Logout?")) {
        await setCurrentUser({});
        Cookies.remove("token");
        navigate("/");
      }
    }
  };

  return (
    <>
      {currentUser && (
        <Link className="addPost" to="/newpost">
          <MdOutlineAddCircle size="50px" />
        </Link>
      )}
      <header>
        <div className="logo-sign">
          <h1 onClick={() => navigate("/home")}>JustIn Case</h1>
          <FilterPostsByUser />
          <button onClick={handleLogin} id="logbtn">
            {currentUser ? currentUser.username : "Login/SignUp"}
          </button>
        </div>
      </header>
      <div className="body">
        {postDetails.length > 0
          ? displayPosts.length > 0 
            ? displayPosts.map((post) => {
                return (
                  <div className="container" key={post.postid} id={post.postid}>
                    <p>{post.content}</p>
                    <div className="options">
                      <div className="like-dis">
                        <span className="likes">
                          <AiFillHeart size="30px" />
                          <p>{post.likes_count}</p>
                        </span>
                        <span className="disLikes">
                          <BiSolidDislike size="30px" />
                          <p>{post.dislikes_count}</p>
                        </span>
                      </div>
                      {currentUser ? (
                        currentUser.userid === post.userid ? (
                          <div className="editDlt">
                            <Link
                              to={`/updatepost/${post.postid}`}
                              className="editBtn"
                            >
                              <RiEdit2Line size="30px" />
                            </Link>
                            <span
                              className="dltBtn"
                              onClick={() => {
                                confirm("Are you sure you want to delete it?")
                                  ? deletePost(post.postid)
                                  : "";
                              }}
                            >
                              <MdDelete size="30px" />
                            </span>
                          </div>
                        ) : (
                          ""
                        )
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                );
              })
            : "The selected User has posted 0 POSTS.\n Can you beleive that? "
          : "Loading..."}
      </div>
    </>
  );
};

export default Home;
