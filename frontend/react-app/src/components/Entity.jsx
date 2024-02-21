import React from "react";
import { AiFillHeart } from "react-icons/ai";
import { BiSolidDislike } from "react-icons/bi";

const Entity = ({ data, key }) => {
  return (
    <div className="container" id={key}>
      <p>{data.content}</p>
      <div className="like-dis">
        <span className="likes">
          <AiFillHeart size="30px" fill="grey" />
          <p>{data.likes_count}</p>
        </span>
        <span className="disLikes">
          <BiSolidDislike size="30px" fill="grey" />
          <p>{data.dislikes_count}</p>
        </span>
      </div>
    </div>
  );
};

export default Entity;
