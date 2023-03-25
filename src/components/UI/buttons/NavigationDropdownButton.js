import React, { forwardRef } from "react";
import NavigationSVG from "../SVG/NavigationSVG";
import "./NavigationDropdownButton.css";

/**
 *
 * @param onClick
 * @param ref
 * @returns
 */
const NavigationDropdownButton = forwardRef((props, ref) => {
  return (
    <>
      <div
        ref={ref}
        className="navigation-dropdown-button"
        onClick={props.onClick}
      >
        <NavigationSVG />
      </div>
    </>
  );
});

export default NavigationDropdownButton;
