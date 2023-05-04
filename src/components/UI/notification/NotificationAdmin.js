import React, { useEffect } from "react";

const NotificationAdmin = (props) => {
    
  useEffect(() => {
    console.log("my dates are ", props.dates);
  }, [props.dates]);
  return (
    <>
    </>
  );
};

export default NotificationAdmin;
