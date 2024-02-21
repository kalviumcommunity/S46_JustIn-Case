import React from "react";
import { AiFillHeart } from "react-icons/ai";
import { BiSolidDislike } from "react-icons/bi";

const Entity = () => {
  return (
    <div className="container">
      <p>I told my wife she should embrace her mistakes. She gave me a hug.</p>
      <div className="like-dis">
        <span className="likes">
          <AiFillHeart size="30px" fill="grey" />
          <p>10</p>
        </span>
        <span className="disLikes">
          <BiSolidDislike size="30px" fill="grey" />
          <p>10</p>
        </span>
      </div>
    </div>
  );
};

export default Entity;
