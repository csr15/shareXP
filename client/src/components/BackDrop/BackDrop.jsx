import React from "react";
import "./BackDrop.css";

export default function BackDrop({clickHandler}) {
  return <div className="xp-backdrop" onClick={clickHandler}></div>;
}
