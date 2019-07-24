import React from "react";
import Controls from "./Controls";
import HamburgerContent from "./HamburgerContent";
class Bread extends React.Component {
  state = {
    baseprice: 1,
    currency: "usd",
    ingredients: [
      { id: 0, ingredient: "Salad", units: 0, price: 0.25 },
      { id: 1, ingredient: "cheese", units: 0, price: 0.5 },
      { id: 2, ingredient: "bacon", units: 0, price: 0.25 },
      { id: 3, ingredient: "meat", units: 0, price: 1.5 }
    ],
    hamburger: [],
    history: []
  };

  setNewIngredient = (value, newingredients) => {
    this.setState({ ingredients: value });
    this.setState({ hamburger: newingredients });
  };
  setNewCurrencyprices = value => {
    this.setState({ ingredients: value });
  };
  setNewCurrency = newcurrency => {
    this.setState({ currency: newcurrency });
  };
  setNewPrice = newprice => {
    this.setState({ baseprice: newprice });
  };
  setHistory = () => {
    localStorage.setItem("history", JSON.stringify(this.state.hamburger));
    localStorage.setItem(
      "history-ingredients",
      JSON.stringify(this.state.ingredients)
    );
    localStorage.setItem("history-price", JSON.stringify(this.state.baseprice));
    localStorage.setItem(
      "history-currency",
      JSON.stringify(this.state.currency)
    );
  };
  getHistory = () => {
    this.setState({ hamburger: JSON.parse(localStorage.getItem("history")) });
    this.setState({
      ingredients: JSON.parse(localStorage.getItem("history-ingredients"))
    });
    this.setState({
      baseprice: JSON.parse(localStorage.getItem("history-price"))
    });
    this.setState({
      currency: JSON.parse(localStorage.getItem("history-currency"))
    });
  };
  componentDidMount = () => {
    if (localStorage.getItem("history") === null) {
      localStorage.setItem("history", JSON.stringify(this.state.hamburger));
    } if(localStorage.getItem("history").length>2) {
      document.getElementById("history").type = "submit";
      
    }
  };

  render() {
    return (
      <>
      <div className="main-hamburger">
        <div className="bread-top" />
        <HamburgerContent hamburger={this.state.hamburger} />
        <div className="bread-buttom" />
        </div>
        <div className="control-container">
          <Controls
            baseprice={this.state.baseprice}
            ingredients={this.state.ingredients}
            hamburger={this.state.hamburger}
            setNewIngredient={this.setNewIngredient}
            setNewPrice={this.setNewPrice}
            setHistory={this.setHistory}
            getHistory={this.getHistory}
            currency={this.state.currency}
            setNewCurrency={this.setNewCurrency}
            setNewCurrencyprices={this.setNewCurrencyprices}
          />
        </div>
      </>
    );
  }
}

export default Bread;
