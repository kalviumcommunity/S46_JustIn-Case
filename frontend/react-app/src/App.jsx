import React, { useEffect, useState } from "react";
import AllRoutes from "./components/AllRoutes";
import "./App.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const Details = React.createContext();
function App() {
  const navigate = useNavigate();
  const [postDetails, setPostDetails] = useState([]);
  const api = "https://justin-case.onrender.com/api/posts";

  useEffect(() => {
    const getData = async () => {
      try {
        await axios
          .get(api)
          .then((res) => {
            setPostDetails(res.data);
          })
          .catch((err) => console.log(err));
      } catch (err) {
        console.log(err);
      }
    };
    getData();
    console.log("App.jssx");
  }, []);

  return (
    <>
      <header>
        <div className="logo-sign">
          <h1 onClick={() => navigate("/")}>JustIn Case</h1>
          <button id="logbtn">Login/SignUp</button>
        </div>
      </header>
      <Details.Provider value={{ postDetails, setPostDetails }}>
        <AllRoutes />
      </Details.Provider>
    </>
  );
}

export default App;
