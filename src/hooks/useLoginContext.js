import { useEffect, useState } from "react";

const useLoginContext = () => {
  const [login, setLogin] = useState({});

  useEffect(() => {
    const savedValue = localStorage.getItem("login");
    const parsedValue = JSON.parse(savedValue);
    setLogin({...parsedValue});
  }, []);

  return login;
};

export default useLoginContext;
