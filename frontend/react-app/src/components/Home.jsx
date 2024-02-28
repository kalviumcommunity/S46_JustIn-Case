import  { useContext } from "react";
import { MdOutlineAddCircle } from "react-icons/md";
import { Link } from "react-router-dom";
import { AiFillHeart } from "react-icons/ai";
import { BiSolidDislike } from "react-icons/bi";
import { Details, Base_API } from "../App";
import { RiEdit2Line } from "react-icons/ri";
import { MdDelete } from "react-icons/md";
import axios from "axios";

const Home = () => {
  const { postDetails, setFlag } = useContext(Details);

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

  return (
    <>
      <Link className="addPost" to="/newpost">
        <MdOutlineAddCircle size="50px" />
      </Link>

      <div className="body">
        {postDetails.length > 0
          ? postDetails.map((post) => {
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
