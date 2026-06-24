// components/CategoryButton.jsx
import React from "react";

const Buttons = ({ name, imgSrc, className, onClick, isActive }) => {
  return (
    <button
      onClick={onClick}
      className={`category-btn ${className} ${isActive ? "active" : ""}`}
    >
      <img src={imgSrc} alt={name} />
      {name}
    </button>
  );
};

export default Buttons;
