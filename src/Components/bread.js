import React from "react";
import Controls from "./controls";
import HamburgerContent from './HamburgerContent'

class Bread extends React.Component {
  state = {
    baseprice: 1,
    ingredients: [
      { id: 0, ingredient: "Salad", units: 0, price: 0.25},
      { id: 1, ingredient: "cheese", units: 0, price: 0.5},
      { id: 2, ingredient: "bacon", units: 0, price: 0.25},
      { id: 3, ingredient: "meat", units: 0, price: 1.5}
    ],
    hamburger:[]
  };

  setNewIngredient = (value,newingredients) => {
    this.setState({ ingredients: value });
    this.setState({ hamburger: newingredients });
    
  };
  setNewPrice = newprice => {
    this.setState({ baseprice: newprice });
  };
  
  render() {
    return (
      <>
        <div className="bread-top" />
        <HamburgerContent
          hamburger={this.state.hamburger}
/>
        <div className="bread-buttom" />
        <div className="control-container">
          <Controls
            baseprice={this.state.baseprice}
            ingredients={this.state.ingredients}
            hamburger={this.state.hamburger}
            setNewIngredient={this.setNewIngredient}
            setNewPrice={this.setNewPrice}
          />
        </div>
      </>
    );
  }
}

export default Bread;
