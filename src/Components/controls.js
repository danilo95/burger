import React from "react";

class Controls extends React.Component {
  constructor() {
    super();
    this.actualValue = null;
    this.acualIngredient = null;
    this.price = null;
    this.temporalHamburger = null;
    this.temporalArray = null;
    this.temp = null;
  }
  NumberFormat = numberValue => {
    let numberToReturn;
    switch (this.props.currency) {
      case "usd":
        numberToReturn = new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD"
        }).format(numberValue);

        break;
      case "eur":
        numberToReturn = new Intl.NumberFormat("de-DE", {
          style: "currency",
          currency: "EUR"
        }).format(numberValue);

        break;
      default:
    }
    return numberToReturn;
  };
  moreIngridients = e => {
    this.actualValue = this.props.ingredients[e.target.id].units;
    this.acualIngredient = this.props.ingredients[e.target.id].ingredient;
    this.price = this.props.ingredients[e.target.id].price;
    this.temp = this.props.ingredients;
    this.temporalHamburger = this.props.hamburger;
    this.temporalArray = this.temp.map(value => {
      if (value.ingredient === this.acualIngredient) {
        value.units = this.actualValue + 1;
      }
      return value;
    });
    this.temporalHamburger.push(this.acualIngredient);
    this.props.setNewIngredient(this.temporalArray, this.temporalHamburger);
    this.modificatePrice(this.actualValue, this.price, "plus");
  };

  lessIngridients = e => {
    this.actualValue = this.props.ingredients[e.target.id].units;
    this.acualIngredient = this.props.ingredients[e.target.id].ingredient;
    this.price = this.props.ingredients[e.target.id].price;
    this.temporalHamburger = this.props.hamburger; //nuevo array temporal
    this.modificatePrice(this.actualValue, this.price, "less");
    this.actualValue === 0
      ? (this.actualValue = 0)
      : (this.actualValue = this.actualValue - 1);
    let temp = this.props.ingredients;
    let temporalArray = temp.map(value => {
      if (value.ingredient === this.acualIngredient) {
        value.units = this.actualValue;
      }
      return value;
    });
    this.props.setNewIngredient(
      temporalArray,
      this.deleteIngrediente(this.temporalHamburger, this.acualIngredient)
    );
  };
  modificatePrice(actualValue, price, flag) {
    if (actualValue === 0 && flag === "less") {
    } else {
      flag === "plus"
        ? this.props.setNewPrice(price + this.props.baseprice)
        : this.props.setNewPrice(this.props.baseprice - price);
    }
  }
  deleteIngrediente(ingredientsarray, valuetodelete) {
    let indextoeliminate = ingredientsarray.findIndex(newingredient => {
      if (newingredient === valuetodelete) {
        return newingredient;
      }
    });
    let newArray = ingredientsarray.filter(
      (ingredient, index) => index !== indextoeliminate
    );
    return newArray;
  }

  changeCurrency = e => {
    let to = e.target.value;
    let amount = this.props.baseprice;
    var crrncy = {
      eur: { usd: 1.1152122544, simbol: "€" },
      usd: { eur: 0.8966902902, simbol: "$" }
    };
    if (this.props.currency === to) {
    } else {
      amount = amount * crrncy[this.props.currency][to];
      this.props.setNewPrice(amount);
      this.props.setNewCurrency(to);
      this.updatePricesCurrency(crrncy[this.props.currency][to]);
    }
  };

  updatePricesCurrency = currency => {
    this.temp = this.props.ingredients;
    this.temporalArray = this.temp.map(value => {
      value.price = currency * value.price;
      return value;
    });
    this.props.setNewCurrencyprices(this.temporalArray);
  };

  saveBurger = () => {
    this.props.setHistory();
    document.getElementById("history").type = "submit";
    document.getElementById("finish").type = "submit";
    this.showSavedMessage();
  };
  showSavedMessage = () => {
    document.getElementById("message").style.display = "flex";
    setTimeout(() => {
      document.getElementById("message").style.display = "none";
    }, 2000);
  };
  getburgerhistory = () => {
    document.getElementById("finish").type = "submit";
    this.props.getHistory();
  };
  buyHamburger = () => {
    document
      .getElementById("hambuger-container")
      .classList.add("animated", "bounceOutRight");
    alert("thanks,come back soon..");
    setTimeout("location.href = './'", 2000);
  };

  render() {
    return (
      <>
        <div className="row-currency">
          <h3 id="price">{`Current Price: ${this.NumberFormat(
            this.props.baseprice
          )}`}</h3>
          <label>
            Change Currency:
            <select name="select" id="select" onChange={this.changeCurrency}>
              <option value="usd">$ Dollar </option>
              <option value="eur">€ Euro</option>
            </select>
          </label>
        </div>
        <div className="controls">
          {this.props.ingredients.map(ingredients => {
            return (
              <div className="row" key={ingredients.id}>
                <label>
                  {ingredients.ingredient}: {ingredients.units}
                </label>
                <label className="subtitle">
                  {" "}
                  Cost:
                  {this.NumberFormat(ingredients.price)}
                </label>
                <input
                  type="submit"
                  value="less"
                  className="lessbtn"
                  id={ingredients.id}
                  onClick={this.lessIngridients}
                />
                <input
                  type="submit"
                  value="MORE"
                  className="morebtn"
                  id={ingredients.id}
                  onClick={this.moreIngridients}
                />
              </div>
            );
          })}
        </div>
        <div className="controls-content">
          <input
            type="submit"
            value="Save"
            className="savebutton"
            onClick={this.saveBurger}
          />
          <input
            id="history"
            type="hidden"
            value="Re-Build last Hamburger"
            className="previusburger"
            onClick={this.getburgerhistory}
          />
          <input
            id="finish"
            type="hidden"
            value="Buy"
            className="previusburger"
            onClick={this.buyHamburger}
          />
        </div>
      </>
    );
  }
}

export default Controls;
