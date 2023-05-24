import { useEffect, useState } from "react";

const useWarningMessage = () => {
  const [warningMessage, setWarningMessage] = useState("");

  useEffect(() => {
    if (warningMessage) {
      setTimeout(() => {
        setWarningMessage("");
      }, 5000);
    }
  }, [warningMessage]);

  return [warningMessage, setWarningMessage];
};

export default useWarningMessage;
