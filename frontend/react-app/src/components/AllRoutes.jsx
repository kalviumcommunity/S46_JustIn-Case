import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import NewPost from "./newPost";
import UpdatePost from "./UpdatePost";
import Login from "./Login";
import SignUp from "./SignUp";

const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<SignUp/>} />
      <Route path="/home" element={<Home />} />
      <Route path="/newpost" element={<NewPost />} />
      <Route path="/updatepost/:id" element={<UpdatePost />} />
    </Routes>
  );
};

export default AllRoutes;
