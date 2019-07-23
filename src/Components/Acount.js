import React from "react";
class Acountlist extends React.Component{
  
  render() {
    return (
      <>
        {
          <>
          
          <table>
            {this.props.ingredients.map((hamburgerclass,index) => {
              return <tr>
                <td>{hamburgerclass.ingredient}</td>
                <td>{hamburgerclass.units}</td>
                <td>{ hamburgerclass.units*hamburgerclass.price}</td>
              </tr>
            })}
            </table>
          </>
        }
       
      </>
    );
  };
  }
  
  
  export default Acountlist;
  
  