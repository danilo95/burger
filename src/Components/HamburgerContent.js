import React from "react";

class HamburgerContent extends React.Component{
 
render() {
  return (
    <>
      {
        <>
          {this.props.hamburger.map((hamburgerclass,index) => {
            return <div className={`${hamburgerclass} animated bounceInUp`}  key={index} />;
          })}
        </>
      }
     
    </>
  );
};
}


export default HamburgerContent;
