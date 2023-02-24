import React from "react";
import "./Welcome.css";
import PhotographerCard from "../components/photographer/PhotographerCard";
import ReservationSteps from "../components/UI/SVG/ReservationSteps";
import { Link } from "react-router-dom";
import DateSVG from "../components/UI/SVG/DateSVG";
import PackagesSVG from "../components/UI/SVG/PackagesSVG";
import PortfolioSVG from "../components/UI/SVG/PortfolioSVG";

// This component renders the welcome page componenets

const Welcome = () => {
  return (
    <div className="welcome__container">
      <div className="welcome-sub-heading">
        Need to capture your unforgettable moments?
      </div>
      <PhotographerCard />
      <div className="welcome-sub-heading">Get reserved your date NOW !</div>
      <ReservationSteps />

      <div className="welcome-options__container">
        <div className="welcome-options__option welcome-date">
          <DateSVG className="welcome-options__option-svg" />
          <Link className="welcome-options__option-link pick-date">Pick A Date</Link>
        </div>
        <div className="welcome-options__option welcome-package">
          <PackagesSVG className="welcome-options__option-svg" />
          <Link className="welcome-options__option-link select-package">Select A Package</Link>
        </div>
        <div className="welcome-options__option welcome-portfolio">
          <PortfolioSVG className="welcome-options__option-svg" />
          <Link className="welcome-options__option-link see-portfolio">See Portfolio</Link>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
