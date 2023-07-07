import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import RoundedCardContainer from "./components/UI/containers/RoundedCardContainer";

const ErrorFallback = (props) => {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      navigate("/", { replace: true });
    }, 3000);
  }, []);

  // Uncaught ReferenceError: path is not defined
  return (
    <div>
      <RoundedCardContainer>
        Error: The page you requested, cannot be found. Redirecting to Home Page
      </RoundedCardContainer>
    </div>
  );
};

export default ErrorFallback;
