import React from "react";
import { AiFillHeart } from "react-icons/ai";
import { BiSolidDislike } from "react-icons/bi";


const Entity = () => {
    console.log(AiFillHeart)
  return (
    <div className="container">
      <p>
      I told my wife she should embrace her mistakes. She gave me a hug.
      </p>
      <div className="like-dis">
      <AiFillHeart size='30px' fill="grey"/>
      <BiSolidDislike size='30px' fill="grey"  />
      </div>
    </div>
  );
};

export default Entity;
