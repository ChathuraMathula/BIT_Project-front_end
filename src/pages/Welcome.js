import React from "react";
import "./Welcome.css";
import PhotographerCard from "../components/photographer/PhotographerCard";
import WelcomeCard from "../components/UI/WelcomeCard";
import ReservationSteps from "../components/UI/ReservationSteps";

// This component renders the welcome page componenets

const Welcome = () => {
  return (
    <>
      <div className="welcome-sub-heading">Need to capture your unforgettable moments?</div>
      <PhotographerCard />
      <div className="welcome-sub-heading">Get reserved your date NOW !</div>
      <ReservationSteps />
      <div className="welcome-options__container">
        <WelcomeCard className="welcome-options__option" url="/dates" name="Pick a Date">
        <svg xmlns="http://www.w3.org/2000/svg" width="486" height="460.5" viewBox="0 0 486 460.5">
  <rect id="Rectangle_21" data-name="Rectangle 21" width="486" height="460" rx="51" fill="none"/>
  <g id="Group_3" data-name="Group 3" transform="translate(-1006 -383)">
    <rect id="Rectangle_5" data-name="Rectangle 5" width="341" height="359" rx="51" transform="translate(1079 434)" fill="#f0effe" stroke="#1b1464" stroke-miterlimit="10" stroke-width="1"/>
    <rect id="Rectangle_6" data-name="Rectangle 6" width="219" height="208" transform="translate(1140 532)" fill="#9cbaf9"/>
    <text id="_05" data-name="05" transform="translate(1163.82 695.14)" fill="#1b1464" font-size="168" font-family="MyriadPro-Regular, Myriad Pro"><tspan x="0" y="0">05</tspan></text>
    <text id="Thursday" transform="translate(1140.5 513.03)" fill="#180f77" font-size="51" font-family="NuevaStd-Bold, Nueva Std" font-weight="700" letter-spacing="0.03em"><tspan x="0" y="0">T</tspan><tspan y="0" letter-spacing="-0.02em">hursd</tspan><tspan y="0" letter-spacing="-0.01em">a</tspan><tspan y="0" letter-spacing="-0.02em">y</tspan></text>
  </g>
  <g id="Group_4" data-name="Group 4" transform="translate(-1281 -423)">
    <rect id="Rectangle_7" data-name="Rectangle 7" width="143" height="143" rx="71.5" transform="translate(1621 740)" fill="#0aff0a" stroke="#10fa00" stroke-miterlimit="10" stroke-width="1"/>
    <path id="Path_1" data-name="Path 1" d="M740.5,548.5c10,2,31,28,31,28l9,12c7-41,55-86,55-86-56,49-60,59-60,59C754.5,551.5,740.5,548.5,740.5,548.5Z" transform="translate(903.5 267.5)" fill="#fff"/>
  </g>
</svg>




        </WelcomeCard>

        <WelcomeCard className="welcome-options__option" url="/packages" name="Explore Packages"> 
        <svg xmlns="http://www.w3.org/2000/svg" width="486.5" height="460.5" viewBox="0 0 486.5 460.5">
  <rect id="Rectangle_23" data-name="Rectangle 23" width="486" height="460" rx="51" fill="none"/>
  <path id="Path_28" data-name="Path 28" d="M238.83,132.525,282.8,104.41v63.339l-43.968,30.7Z" transform="translate(74.779 101.947)" fill="#fe8585"/>
  <rect id="Rectangle_9" data-name="Rectangle 9" width="341" height="359" rx="51" transform="translate(73 51)" fill="#fff5dc" stroke="#8a8022" stroke-miterlimit="10" stroke-width="1"/>
  <path id="Path_21" data-name="Path 21" d="M80.69,72.48,186.806,49.09l4.643,119.34L80.69,193.3Z" transform="translate(104.131 122.404)" fill="#d5d8f9"/>
  <path id="Path_22" data-name="Path 22" d="M73.728,72.48,1.33,20.96V137.04l72.4,56.26Z" transform="translate(111.093 122.404)" fill="#adb3ff"/>
  <path id="Path_23" data-name="Path 23" d="M1.33,20.96l72.4,51.52L179.844,49.09,102.6.53Z" transform="translate(111.093 122.404)" fill="#fff"/>
  <path id="Path_24" data-name="Path 24" d="M37.38,44.3,76.891,72.48,183.006,49.09,141.379,23.3Z" transform="translate(107.931 122.404)" fill="#c1c5f5"/>
  <path id="Path_25" data-name="Path 25" d="M102.6.53,1.33,20.96,34.217,44.3l104-21Z" transform="translate(111.093 122.404)" fill="#96a0fa"/>
  <path id="Path_26" data-name="Path 26" d="M29.39,75.3l3.64-9,5.474,17,1.487-35.41L142.5,24.3l-10.938-7.11L30.777,40.11Z" transform="translate(108.632 122.404)" fill="#2323ff"/>
  <path id="Path_27" data-name="Path 27" d="M237.129,133.156l-64.45-12.766-2.819,65.116,67.269,13.573Z" transform="translate(93.48 121.316)" fill="#f6c7c7"/>
  <path id="Path_29" data-name="Path 29" d="M281.168,103.952,237.2,132.068,172.75,119.3l46.913-26.5Z" transform="translate(93.409 122.404)" fill="#fff"/>
  <path id="Path_30" data-name="Path 30" d="M262.482,117.2,238.14,132.578l-65.39-12.766L198.4,105.74Z" transform="translate(93.409 121.894)" fill="#f5a2a2"/>
  <path id="Path_31" data-name="Path 31" d="M220.782,92.8l62.866,11.152-20.417,12.737L198.67,105.23Z" transform="translate(92.77 122.404)" fill="#fe4848"/>
  <path id="Path_33" data-name="Path 33" d="M160.38,169l-40.74-8.19-1.78,41.79,42.52,8.71Z" transform="translate(93.48 122.404)" fill="#c4f9c6"/>
  <path id="Path_34" data-name="Path 34" d="M160.38,169l27.79-18.04v40.65l-27.79,19.7Z" transform="translate(93.48 122.404)" fill="#5ee17d"/>
  <path id="Path_35" data-name="Path 35" d="M188.17,150.96,160.38,169l-40.74-8.19L149.3,143.8Z" transform="translate(93.48 122.404)" fill="#fff"/>
  <path id="Path_36" data-name="Path 36" d="M175.54,159.13,160.38,169l-40.74-8.19,15.98-9.03Z" transform="translate(93.48 122.404)" fill="#94eba8"/>
  <path id="Path_37" data-name="Path 37" d="M149.3,143.8l38.87,7.16-12.63,8.17-39.92-7.35Z" transform="translate(93.48 122.404)" fill="#4df753"/>
  <path id="Path_51" data-name="Path 51" d="M160.38,179.067l45.809-28.107v63.334L160.38,244.988Z" transform="translate(170.229 75.407)" fill="#fd8c8c"/>
  <path id="Path_38" data-name="Path 38" d="M178.34,169.99l-1.4-3.15-2.1,5.95-.57-12.4-39.35-8.26,4.2-2.49,38.69,8.02Z" transform="translate(93.48 122.404)" fill="#006b19"/>
  <g id="Group_7" data-name="Group 7" transform="translate(-1936 -372)">
    <rect id="Rectangle_10" data-name="Rectangle 10" width="143" height="143" rx="71.5" transform="translate(2279 689)" fill="#ff850a" stroke="#fa6c00" stroke-miterlimit="10" stroke-width="1"/>
    <path id="Path_20" data-name="Path 20" d="M740.5,548.5c10,2,31,28,31,28l9,12c7-41,55-86,55-86-56,49-60,59-60,59C754.5,551.5,740.5,548.5,740.5,548.5Z" transform="translate(1561.5 216.5)" fill="#fff"/>
  </g>
  <path id="Path_32" data-name="Path 32" d="M266.232,133.978l-2.214-4.908-3.326,9.269-.9-19.317L197.53,106.151l6.652-3.881,61.2,12.506Z" transform="translate(92.798 122.031)" fill="#ca1414"/>
</svg>



        </WelcomeCard>

        <WelcomeCard className="welcome-options__option" url="/portfolio" name="See Portfolio"> 
        <svg xmlns="http://www.w3.org/2000/svg" width="486.5" height="460.5" viewBox="0 0 486.5 460.5">
  <rect id="Rectangle_22" data-name="Rectangle 22" width="486" height="460" rx="51" fill="none"/>
  <g id="Group_6" data-name="Group 6" transform="translate(-1433 214)">
    <rect id="Rectangle_11" data-name="Rectangle 11" width="341" height="359" rx="51" transform="translate(1506 -163)" fill="#fde8f2" stroke="#8a2225" stroke-miterlimit="10" stroke-width="1"/>
    <rect id="Rectangle_13" data-name="Rectangle 13" width="122" height="168" transform="translate(1563 -47.404) rotate(-16.02)" fill="#e6fcf8" stroke="#a09cfd" stroke-miterlimit="10" stroke-width="8"/>
    <circle id="Ellipse_1" data-name="Ellipse 1" cx="22.53" cy="22.53" r="22.53" transform="translate(1616.459 -23.886)" fill="#5f5a61"/>
    <path id="Path_40" data-name="Path 40" d="M80.19,111.71c-25.9,11.83-19.29,34.84-19.29,34.84l12.43,43.3,69.87-20.07-12.1-42.15c-6-22.94-33.67-20.87-33.67-20.87Z" transform="translate(1558.059 -86.026)" fill="#7ac7fa"/>
    <rect id="Rectangle_14" data-name="Rectangle 14" width="8.45" height="30.98" transform="translate(1608.353 59.672) rotate(-16.26)" fill="#f6d997"/>
    <rect id="Rectangle_15" data-name="Rectangle 15" width="8.45" height="30.98" transform="translate(1689.036 36.745) rotate(-16.02)" fill="gray"/>
    <path id="Path_41" data-name="Path 41" d="M86.09,109.29l10.74,42.39,4.23,3.02,2.49-5.01L88.8,108.51Z" transform="translate(1558.059 -86.026)" fill="#4907ff"/>
    <rect id="Rectangle_16" data-name="Rectangle 16" width="122" height="168" transform="translate(1650.319 -71.006)" fill="#dff8e5" stroke="#b691ff" stroke-miterlimit="10" stroke-width="8"/>
    <circle id="Ellipse_2" data-name="Ellipse 2" cx="8.75" cy="8.75" r="8.75" transform="translate(1674.319 -3.006)" fill="#ffe9c7" stroke="#b3b3b3" stroke-miterlimit="10" stroke-width="0.5"/>
    <rect id="Rectangle_17" data-name="Rectangle 17" width="4" height="7" transform="translate(1689.819 85.494)" fill="#ffe9c7" stroke="#b3b3b3" stroke-miterlimit="10" stroke-width="0.5"/>
    <circle id="Ellipse_3" data-name="Ellipse 3" cx="8.75" cy="8.75" r="8.75" transform="translate(1726.629 -11.386)" fill="#494545" stroke="#1a1414" stroke-miterlimit="10" stroke-width="0.5"/>
    <path id="Path_42" data-name="Path 42" d="M174.04,95.64h7.49l11.54,1.5-3,33H165.36l-2.29-34Z" transform="translate(1558.059 -86.026)" fill="#e9b282" stroke="#999" stroke-miterlimit="10" stroke-width="0.5"/>
    <path id="Path_43" data-name="Path 43" d="M163.07,97.14l-6.14,22.47,3.85,14.14,4.58-3.61Z" transform="translate(1558.059 -86.026)" fill="#ebebb9" stroke="#999" stroke-miterlimit="10" stroke-width="0.5"/>
    <path id="Path_44" data-name="Path 44" d="M193.07,98.14l5,21-3.69,15.96-4.31-4.96Z" transform="translate(1558.059 -86.026)" fill="#ebebb9" stroke="#999" stroke-miterlimit="10" stroke-width="0.5"/>
    <path id="Path_45" data-name="Path 45" d="M165.57,130.76l.51,44.88h7.27l4.72-37.5,4,37h6l2-44.5-23.48.12Z" transform="translate(1558.059 -86.026)" fill="#789286" stroke="#999" stroke-miterlimit="10" stroke-width="0.5"/>
    <rect id="Rectangle_18" data-name="Rectangle 18" width="12" height="4" transform="translate(1719.129 88.114)" fill="#575757"/>
    <rect id="Rectangle_19" data-name="Rectangle 19" width="12" height="4" transform="translate(1740.129 88.114)" fill="#4e4848"/>
    <path id="Path_46" data-name="Path 46" d="M120.76,102.52h7l10,2.14,6,6.42-6,5.34-4,16.07c0,4.25,4,8.52,4,8.52,2,2.14,5,31,5,31h-22Z" transform="translate(1558.059 -86.026)" fill="#a4b5e3"/>
    <path id="Path_47" data-name="Path 47" d="M129.76,102.52h-7l-10,2.14-6,6.42,6,5.34,4,16.07c0,4.25-4,8.52-4,8.52-2,2.14-5,31-5,31h22Z" transform="translate(1558.059 -86.026)" fill="#7171f6"/>
    <rect id="Rectangle_20" data-name="Rectangle 20" width="4" height="7" transform="translate(1674.819 85.494)" fill="#ffe9c7" stroke="#b3b3b3" stroke-miterlimit="10" stroke-width="0.5"/>
    <path id="Path_48" data-name="Path 48" d="M122.76,80.52a2.55,2.55,0,0,0-.94-.65A6.88,6.88,0,0,0,117,83c-3.25,5.5-2.25,13.5-2.25,13.5l7-9,5-3a51.822,51.822,0,0,1,5.5,2.93c3.5,2.07,3.5,3.07,3.5,3.07s2-3,1-5-4.57-5.63-5.28-5.82-3.58-2.2-5.65-1.19a11,11,0,0,1-5.07.68c0,1.33,6,3.33,6,3.33l6,3" transform="translate(1558.059 -86.026)" fill="#434343" stroke="#393939" stroke-miterlimit="10" stroke-width="0.5"/>
    <path id="Path_49" data-name="Path 49" d="M107.75,111.34l3.01,13.18,5,7,1-.97-4-15.03Z" transform="translate(1558.059 -86.026)" fill="#ffe9c7" stroke="#b3b3b3" stroke-miterlimit="10" stroke-width="0.5"/>
    <path id="Path_50" data-name="Path 50" d="M142.84,111.84l-3.01,13.18-5,7-1-.97,4-15.03Z" transform="translate(1558.059 -86.026)" fill="#faf5d4" stroke="#b3b3b3" stroke-miterlimit="10" stroke-width="0.5"/>
  </g>
  <g id="Group_5" data-name="Group 5" transform="translate(-1393 225)">
    <rect id="Rectangle_12" data-name="Rectangle 12" width="143" height="143" rx="71.5" transform="translate(1736 92)" fill="#ff0a5c" stroke="#a80722" stroke-miterlimit="10" stroke-width="1"/>
    <path id="Path_39" data-name="Path 39" d="M740.5,548.5c10,2,31,28,31,28l9,12c7-41,55-86,55-86-56,49-60,59-60,59C754.5,551.5,740.5,548.5,740.5,548.5Z" transform="translate(1018.5 -380.5)" fill="#fff"/>
  </g>
</svg>

        </WelcomeCard>
      </div>
    </>
  );
};

export default Welcome;
