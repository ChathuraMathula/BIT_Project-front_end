import React from "react";
import "./NameValueTitle.css";

/**
 * 
 * @param children
 * @returns 
 */
const NameValueTitle = (props) => {
  return (
    <>
      <h2 className="name-value__title">{props.children}</h2>
    </>
  );
};

export default NameValueTitle;
