import React, { useState, useEffect } from "react";
import Header from "./Header";
import PizzaForm from "./PizzaForm";
import PizzaList from "./PizzaList";

function App() {
  const [pizzas, setPizzas] = useState([]);
  const [topping, setTopping] = useState("");
  const [size, setSize] = useState("")
  const [isVegetarian, setIsVegetarian] = useState(false);
  const [editPizzaID, setEditPizzaID] = useState(0);

  useEffect(() => {
    fetch('http://localhost:3001/pizzas')
      .then((response) => response.json())
      .then((pizzasData) => setPizzas(pizzasData));
  }, [])

  function handleEditPizza(pizza) {
    setTopping(pizza.topping);
    setSize(pizza.size);
    setIsVegetarian(pizza.vegetarian);
    setEditPizzaID(pizza.id)
  }

  function handleToppingChange(e) {
    setTopping(e.target.value)
    setSize(e.target.value);
  }

  function handleSizeChange(e) {
    setSize(e.target.value);
  }

  function handleIsVegetarianChange(e) {
    setIsVegetarian(e.target.checked);
  }

  function handleUpdatePizza(updatedPizza) {
    const updatedPizzas = pizzas.map((pizza) => {
      if(pizza.id === updatedPizza.id) {
        return updatedPizza;
      } else {
        return pizza;
      }
    });

    setPizzas(updatedPizzas);
  }

  return (
    <>
      <Header />
      <PizzaForm 
        editPizzaID={ editPizzaID }
        topping={ topping }
        size={ size }
        isVegetarian={ isVegetarian }
        handleToppingChange={ handleToppingChange }
        handleSizeChange={ handleSizeChange }
        handleIsVegetarianChange={ handleIsVegetarianChange }
        onUpdatePizza={ handleUpdatePizza }
      />
      <PizzaList pizzas={ pizzas } handleEditPizza={ handleEditPizza }/>
    </>
  );
}

export default App;
