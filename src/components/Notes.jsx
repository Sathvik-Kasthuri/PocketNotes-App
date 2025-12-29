import React, { useState, useEffect } from "react";
import "./Notestyles.css";

import img from "../assets/Notes.png";
import Popup from "../modal/Popup";
import UserData from "./UserData";
import { getInitials } from "../utils/getInitials";

const Notes = () => {
  const [click, setClick] = useState(false);

  const [groups, setGroups] = useState(() => {
    const savedGroups = localStorage.getItem("groups");
    return savedGroups ? JSON.parse(savedGroups) : [];
  });

  

  const [selectedGroup, setSelectedGroup] = useState(null);

  const [noteText, setNoteText] = useState("");

  const [isMobileView, setIsMobileView] = useState(false);

  const addGroup = (group) => {
    const newName = group.name.trim().toLowerCase();

    const isDuplicate = groups.some(
      (group) => group.name.toLowerCase() === newName
    );

    if (isDuplicate) {
      return;
    }

    const newGroup = {
      ...group,
      id: Date.now(),
      notes: [],
    };

    setGroups((prev) => [...prev, newGroup]);
  };

  const addNote = () => {
    if (!noteText.trim() || !selectedGroup) return;

    const newNote = {
      text: noteText,
      time: new Date().toLocaleTimeString(),
      date: new Date().toDateString(),
    };

    setGroups((prevGroups) =>
      prevGroups.map((group) =>
        group.name === selectedGroup.name
          ? { ...group, notes: [...group.notes, newNote] }
          : group
      )
    );

    setSelectedGroup((prev) => ({
      ...prev,
      notes: [...prev.notes, newNote],
    }));

    setNoteText("");
  };

  function timeConversion(time) {
    const [hours, minutes] = time.split(":");
    let hour = Number(hours);
    const ampm = hour >= 12 ? "PM" : "AM";

    hour = hour % 12 || 12; // converts 0 → 12
    return `${hour}:${minutes} ${ampm}`;
  }

  function formatDate(dateStr) {
    const date = new Date(dateStr);

    return date.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  }

  useEffect(() => {
    localStorage.setItem("groups", JSON.stringify(groups));
  }, [groups]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth <= 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="container">
      <div className={`notes ${isMobileView && selectedGroup ? "hidden" : ""}`}>
        <div className="notes-naming">
          <h2>Pocket Notes</h2>
        </div>

        {/* render groups */}

        {groups.map((group) => (
          <UserData
            key={group.id}
            group={group}
            isActive={selectedGroup?.id === group.id}
            onSelect={() => setSelectedGroup(group)}
          />
        ))}

        <div className="button">
          <button onClick={() => setClick(!click)} className="plus-button">
            +
          </button>
        </div>
      </div>

      <div
        className={`notebook ${isMobileView && !selectedGroup ? "hidden" : ""}`}
      >
        {selectedGroup ? (
          <>
            {/* HEADER */}
            <div className="notes-header">
              {isMobileView && (
                <button
                  className="back-btn"
                  onClick={() => setSelectedGroup(null)}
                >
                  ←
                </button>
              )}

              <span
                className="group-color"
                style={{ background: selectedGroup.color }}
              >
                {getInitials(selectedGroup.name)}
              </span>

              <h2>{selectedGroup.name}</h2>
            </div>

            {/* NOTES LIST */}
            <div className="notes-body">
              {selectedGroup.notes.length === 0 ? (
                <p className="empty-text">No notes yet</p>
              ) : (
                selectedGroup.notes.map((note, index) => (
                  <div className="note-card" key={index}>
                    <p>{note.text}</p>
                    <span>
                      {formatDate(note.date)} • {timeConversion(note.time)}
                    </span>
                  </div>
                ))
              )}
            </div>

            {/* INPUT AREA */}
            <div className="notes-input">
              <div className="input-wrapper">
                <textarea
                  placeholder="Here Sample Text for Sample work"
                  value={noteText}
                  onChange={(e) => setNoteText(e.target.value)}
                />
                <button onClick={addNote} className="send-btn">
                  ➤
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="notebook-info">
            <img src={img} />
            <h2>Pocket Notes</h2>
            <p>Send and receive messages without keeping your phone online.</p>
            <p>Use Pocket Notes on upto 4 linked devices and 1 mobile phone</p>
          </div>
        )}
      </div>

      {click && <Popup addGroup={addGroup} close={() => setClick(false)} />}
    </div>
  );
};

export default Notes;
