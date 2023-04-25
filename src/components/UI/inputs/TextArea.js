import React from "react";
import './TextArea.css';

const TextArea = (props) => {
  return (
    <>
      <textarea className="text-area-tag" {...props} />
    </>
  );
};

export default TextArea;
