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
        navigate("/home");
      }
    };
    const removeExpiredCookies = async () => {
      if (Cookies.get("token") === undefined) {
        Cookies.remove("token");
      }
      navigate("/");
    };
    removeExpiredCookies();
    AutoLogin();
  }, []);

  useEffect(() => {
    if(Cookies.get("token")){
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
        }}
      >
        <AllRoutes />
      </Details.Provider>
    </>
  );
}

export default App;
