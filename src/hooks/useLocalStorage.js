import { useEffect, useState } from "react";

const getStorageValue = (key, defaultValue) => {
  const savedValue = localStorage.getItem(key);
  const parsedValue = JSON.parse(savedValue);
  return parsedValue || defaultValue;
};

const useLocalStorage = (key, defaultValue) => {
  const [value, setValue] = useState(() => {
    return getStorageValue(key, defaultValue);
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
};

export default useLocalStorage;
