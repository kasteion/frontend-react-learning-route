import React from "react";
import "./fatal.css";

const Fatal = (props) => {
  return <h1 className="error">{props.error}</h1>;
};

export default Fatal;
