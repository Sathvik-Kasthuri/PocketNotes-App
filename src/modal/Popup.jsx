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
            {[
              { name: "purple", hex: "#B38BFA" },
              { name: "pink", hex: "#FF79F2" },
              { name: "aqua", hex: "#43E6FC" },
              { name: "apricot", hex: "#F19576" },
              { name: "blue", hex: "#0047FF" },
              { name: "skyblue", hex: "#6691FF" },
            ].map((item) => (
              <span
                key={item.hex}
                onClick={() => setColor(item.hex)} 
                className={`color-dot ${color === item.hex ? "active" : ""}`}
                style={{ backgroundColor: item.hex }} 
              ></span>
            ))}
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
