import React, { useState, useEffect } from "react";

function PizzaForm({  editPizzaID,
                      topping,
                      size,
                      isVegetarian,
                      handleToppingChange,
                      handleSizeChange,
                      handleIsVegetarianChange,
                      onUpdatePizza
                      }) {

  console.log("is veggie", editPizzaID);
  function handleSubmit(e) {
    e.preventDefault();

    const updatedPizzaData = {
      size: e.target.size.value,
      topping: e.target.topping.value,
      vegetarian: e.target.vegetarian[0].checked
    }

    console.log(updatedPizzaData);

    fetch(`http://localhost:3001/pizzas/${editPizzaID}`, {
      method: 'PATCH',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(updatedPizzaData)
    })
      .then((response) => response.json())
      .then((updatedPizza) => onUpdatePizza(updatedPizza));
  }

  return (
    <form onSubmit={ handleSubmit }>
      <div className="form-row">
        <div className="col-5">
          <input
            className="form-control"
            type="text"
            name="topping"
            placeholder="Pizza Topping"
            value={ topping }
            onChange={(e) => handleToppingChange(e) }
          />
        </div>
        <div className="col">
          <select className="form-control" name="size" value={ size } onChange={(e) => handleSizeChange(e)}>
            <option value="Small">Small</option>
            <option value="Medium">Medium</option>
            <option value="Large">Large</option>
          </select>
        </div>
        <div className="col">
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="vegetarian"
              value="Vegetarian"
              checked={ isVegetarian }
              onChange={(e) => handleIsVegetarianChange(e) }
            />
            <label className="form-check-label">Vegetarian</label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="vegetarian"
              value="Not Vegetarian"
              checked={ isVegetarian }
              onChange={(e) => handleIsVegetarianChange(e)}
            />
            <label className="form-check-label">Not Vegetarian</label>
          </div>
        </div>
        <div className="col">
          <button type="submit" className="btn btn-success">
            Submit
          </button>
        </div>
      </div>
    </form>
  );
}

export default PizzaForm;
