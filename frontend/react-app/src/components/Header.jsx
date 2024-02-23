import React, { useEffect, useState } from "react";
import "../App.css";
import axios from "axios";
import Entity from "../components/Entity";

const Header = () => {
  const api = "https://justin-case.onrender.com/api/posts";
  const [data, setData] = useState([]);

  useEffect(() => {
    const getData = () => {
      axios
        .get(api)
        .then((res) => setData(res.data))
        .catch((err) => console.log(err));
    };
    getData();
  }, []);
  if (data) {
    console.log(data);
  }

  return (
    <>
      <header>
        <div className="logo-sign">
          <h1>JustIn Case</h1>
          <button id="logbtn">Login/SignUp</button>
        </div>
        <p>
          The idea of the project Justin Case is to create a comprehensive list
          of dad jokes which will entertain the readers. This list will serve as
          a go-to resource just in case anyone is in a need for a good chuckle
          or eye-roll-inducing pun.
        </p>
        <hr />
      </header>
      <div className="body">
        {data
          ? data.map((per) => {
              return <Entity key={per.post_id} data={per} />;
            })
          : null}
      </div>
    </>
  );
};

export default Header;
