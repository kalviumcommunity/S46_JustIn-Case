import React, { useEffect, useState } from "react";
import AllRoutes from "./components/AllRoutes";
import "./App.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";

export const Details = React.createContext();
export const Base_API = "https://justin-case.onrender.com/api";
function App() {
  const navigate = useNavigate();
  const [flag, setFlag] = useState(false);
  const [postDetails, setPostDetails] = useState([]);
  const [currentUser, setCurrentUser] = useState({});
  const [totalUsers, setTotalUsers] = useState([]);
  const [displayUsers, setDisplayUsers] = useState("all");

  const getData = async () => {
    try {
      await axios
        .get(Base_API + "/posts", {
          headers: { Authorization: Cookies.get("token") },
        })
        .then((res) => {
          setPostDetails(res.data.sort((a, b) => a.postid - b.postid));
        })
        .catch((err) => console.log(err));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const AutoLogin = async () => {
      if (Cookies.get("token")) {
        let user = JSON.parse(atob(Cookies.get("token").split(".")[1])); //Taking the user info from the token Only if it is already available
        setCurrentUser({
          userid: user.userid,
          username: user.username,
        });
        // setDisplayUsers("all")
        navigate("/home");
      }
    };
    const removeExpiredCookies = async () => {
      if (Cookies.get("token") === undefined) {
        Cookies.remove("token");
      }
      navigate("/");
    };

    const getAllUsers = async () => {
      try {
        const response = await axios.get(Base_API + "/users");
        setTotalUsers(response.data.sort((a, b) => a.userid - b.userid));
      } catch (err) {
        console.log(err.message);
      }
    };

    removeExpiredCookies();
    AutoLogin();
    getAllUsers();
  }, []);

  // useEffect(()=>{
  //   console.log(totalUsers)
  // }, [totalUsers])

  useEffect(() => {
    if (Cookies.get("token")) {
      getData();
    }
  }, [flag]);

  return (
    <>
      <Details.Provider
        value={{
          postDetails,
          setPostDetails,
          setFlag,
          currentUser,
          setCurrentUser,
          totalUsers,
          displayUsers,
          setDisplayUsers,
        }}
      >
        <AllRoutes />
      </Details.Provider>
    </>
  );
}

export default App;
