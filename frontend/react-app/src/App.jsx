import React, { useEffect, useState } from "react";
import AllRoutes from "./components/AllRoutes";
import "./App.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const Details = React.createContext();
export const Base_API = "https://justin-case.onrender.com/api";
function App() {

  const [flag, setFlag] = useState(false);
  const [postDetails, setPostDetails] = useState([]);
  const [currentUser, setCurrentUser] = useState();
  useEffect(() => {
    const getData = async () => {
      try {
        await axios
          .get(Base_API + "/posts")
          .then((res) => {
            setPostDetails(res.data.sort((a,b)=>a.postid - b.postid));
          })
          .catch((err) => console.log(err));
      } catch (err) {
        console.log(err);
      }
    };
    getData();
  }, [flag]);

  return (
    <>

      <Details.Provider value={{ postDetails, setPostDetails, setFlag, currentUser, setCurrentUser }}>
        <AllRoutes />
      </Details.Provider>
    </>
  );
}

export default App;
