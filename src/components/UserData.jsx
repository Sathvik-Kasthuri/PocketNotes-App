import React from "react";
import "./UserData.css";
import { getInitials } from "../utils/getInitials";

const UserData = ({ group, onSelect,isActive }) => {
  return (
    <>
      <div
        className={`group-items ${isActive ? "active" : ""}`}
        onClick={onSelect}
      >
        <span className="group-color" style={{ background: group.color }}>
          {getInitials(group.name)}
        </span>
        <span className="group-name">{group.name}</span>
      </div>
    </>
  );
};

export default UserData;
