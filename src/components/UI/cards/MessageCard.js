import React from "react";
import "./MessageCard.css";

/**
 *
 * @param {string} props.message
 * @returns
 */
const MessageCard = (props) => {
  return (
    <>
      <div className="message-card">{props.message}</div>
    </>
  );
};

export default MessageCard;
