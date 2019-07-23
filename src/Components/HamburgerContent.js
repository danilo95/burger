import React from "react";

const HamburgerContent = props => {
  return (
    <>
      {
        <>
          {props.hamburger.map((hamburgerclass,index) => {
            return <div className={`${hamburgerclass} animated  bounceInUp`}  key={index} />;
          })}
        </>
      }
    </>
  );
};

export default HamburgerContent;
