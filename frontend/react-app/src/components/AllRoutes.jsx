import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import NewPost from "./newPost";


const AllRoutes = () => {
  return <Routes>
    <Route path="/" element={<Home/>} />
    <Route path="/newpost" element={<NewPost/>} />
  </Routes>;
};

export default AllRoutes;
