import React from "react";

class Controls extends React.Component {
  constructor() {
    super();
    this.actualvalue = null;
    this.actualingredient = null;
    this.price = null;
    this.temphamburger = null;
    this.temparray = null;
    this.temp = null;
    this.from='usd';
  }
  NumberFormat = numbervalue => {
    return parseFloat(Math.round(numbervalue * 100) / 100).toFixed(2);
  };

  moreingredient = e => {
    this.actualvalue = this.props.ingredients[e.target.id].units;
    this.actualingredient = this.props.ingredients[e.target.id].ingredient;
    this.price = this.props.ingredients[e.target.id].price;
    this.temp = this.props.ingredients;
    this.temphamburger = this.props.hamburger; //nuevo array temporal
    this.temparray = this.temp.map(value => {
      if (value.ingredient === this.actualingredient) {
        value.units = this.actualvalue + 1;
      }
      return value;
    });
    this.temphamburger.push(this.actualingredient); //se agrego funcion para hamburger
    this.props.setNewIngredient(this.temparray, this.temphamburger); // se agrego temphamburger para que funcione
    this.modificateprice(this.actualvalue, this.price, "plus");
  };

  lessingredient = e => {
    this.actualvalue = this.props.ingredients[e.target.id].units;
    this.actualingredient = this.props.ingredients[e.target.id].ingredient;
    this.price = this.props.ingredients[e.target.id].price;
    this.temphamburger = this.props.hamburger; //nuevo array temporal
    this.modificateprice(this.actualvalue, this.price, "less");
    this.actualvalue === 0
      ? (this.actualvalue = 0)
      : (this.actualvalue = this.actualvalue - 1);
    let temp = this.props.ingredients;
    let temparray = temp.map(value => {
      if (value.ingredient === this.actualingredient) {
        value.units = this.actualvalue;
      }
      return value;
    });
    this.props.setNewIngredient(
      temparray,
      this.deleteingrediente(this.temphamburger, this.actualingredient)
    ); 
  };
  modificateprice(actualvalue, price, flag) {
    if (actualvalue === 0 && flag === "less") {
    } else {
      flag === "plus"
        ? this.props.setNewPrice(price + this.props.baseprice)
        : this.props.setNewPrice(this.props.baseprice - price);
    }
  }
  deleteingrediente(ingredientsarray, valuetodelete) {
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

changecurrency=e=>{

  let to=e.target.value
  let amount=this.props.baseprice
  var crrncy = {'eur': {'usd': 1.11,'yuan':7.67,'simbol':'€'}, 'usd': {'eur': 0.90,'yuan':6.88,'simbol':'$'}, 'yuan': {'eur': 0.13,'usd':0.15,'simbol':'¥'}}
  if (this.from ===to){
    
  } else {
    amount = amount * crrncy[this.from][to];
    document.getElementById('price').innerHTML=`current price: ${crrncy[to]['simbol']} ${amount}`;
    this.from=to;
    
}
}
saveburger=()=>{
  this.props.setHistory();
  document.getElementById('history').type="submit";
}
getburgerhistory=()=>{
  this.props.getHistory();
}

  render() {
    return (
      <>
      <div className="row-currency">
        <h3 id="price">{`Current Price: $ ${this.NumberFormat(this.props.baseprice)}`}</h3>
  
        <label>
    Change Currency: 
        <select name="select" onChange={this.changecurrency}>
  <option value="usd" >$ Dollar </option> 
  <option value="eur" >€ Euro</option>
  <option value="yuan">¥ Yuan</option>
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
                <input
                  type="submit"
                  value="less"
                  className="lessbtn"
                  id={ingredients.id}
                  onClick={this.lessingredient}
                />
                <input
                  type="submit"
                  value="MORE"
                  className="morebtn"
                  id={ingredients.id}
                  onClick={this.moreingredient}
                />
              </div>
                   
                 
            );
          })}
        </div>
        <input type="submit" value="Save" className="savebutton" onClick={this.saveburger}></input>
        <input id="history" type="hidden" value="Re-Build last Hamburger" className="previusburger" onClick={this.getburgerhistory}></input>
      </>
    );
  }
}

export default Controls;
