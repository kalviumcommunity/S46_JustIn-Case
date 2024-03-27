import React, { useContext } from "react";
import { Details } from "../App";

const FilterPostsByUser = () => {
  const { totalUsers, setDisplayUsers } = useContext(Details);
  const handledisplayUser = (event) => {
    const selectedOption = event.target.selectedOptions[0]
    const selectedOptionId = selectedOption.id;
    setDisplayUsers(selectedOptionId)

  }
  return (
    <div>
      <select name="current-user" onChange={handledisplayUser} className="filterUsers">
        <option id="all" value="All">All</option>
        {totalUsers.map &&
          totalUsers.map((user) => {
            return (
              <option key={user.userid} id={`${user.userid}`} value={user.username}>
                {user.username}
              </option>
            );
          })}
      </select>
    </div>
  );
};

export default FilterPostsByUser;
