import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import NewPost from "./newPost";
import UpdatePost from "./UpdatePost";


const AllRoutes = () => {
  return <Routes>
    <Route path="/" element={<Home/>} />
    <Route path="/newpost" element={<NewPost/>} />
    <Route path="/updatepost/:id" element={<UpdatePost/>} />
  </Routes>;
};

export default AllRoutes;
