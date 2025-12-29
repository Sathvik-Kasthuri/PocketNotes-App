import React, { useState } from "react";
import "./Popup.css";
const Popup = ({ addGroup, close }) => {
  //For colors
  const [color, setColor] = useState("");
  //For group-name
  const [groupName, setGroupName] = useState("");
  //For button
  const handleCreate = () => {
    if (!groupName || !color) return;
    addGroup({ name: groupName, color });
  };

  return (
    <div className="modal-popup" onClick={close}>
      <div className="group-container" onClick={(e) => e.stopPropagation()}>

        <h3 className="popup-title">Create New group</h3>

        <div className="group-names">
          <h3>Group Name</h3>
          <input
            type="text"
            placeholder="Enter group name"
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
          />
        </div>

        <div className="color">
          <h3>Choose Colour</h3>
          <div className="color-options">
            <span
              onClick={() => setColor("orange")}
              className="color-dot orange"
            ></span>
            <span
              onClick={() => setColor("blue")}
              className="color-dot blue"
            ></span>
            <span
              onClick={() => setColor("pink")}
              className="color-dot pink"
            ></span>
            <span
              onClick={() => setColor("yellow")}
              className="color-dot yellow"
            ></span>
            <span
              onClick={() => setColor("lightgreen")}
              className="color-dot lightgreen"
            ></span>
            <span
              onClick={() => setColor("aqua")}
              className="color-dot aqua"
            ></span>
          </div>
        </div>
        <div className="create">
          <button onClick={handleCreate} className="create-btn">
            Create
          </button>
        </div>
      </div>
    </div>
  );
};

export default Popup;
