import React, { useState, useEffect } from "react";
import ItemForm from "./ItemForm";
import Filter from "./Filter";
import Item from "./Item";

function ShoppingList() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [items, setItems] = useState([]);

  // Fetch items from server on initial render
  useEffect(() => {
    fetch("http://localhost:4000/items")
      .then((response) => response.json())
      .then((data) => setItems(data));
  }, []);

  function handleCategoryChange(category) {
    setSelectedCategory(category);
  }

  function handleAddItem(newItem) {
    setItems([...items, newItem]);
  }

  function handleDeleteItem(itemId) {
    setItems(items.filter((item) => item.id !== itemId));
  }

  function handleToggleCart(itemId) {
    setItems(
      items.map((item) =>
        item.id === itemId ? { ...item, isInCart: !item.isInCart } : item
      )
    );
  }

  const itemsToDisplay = items.filter((item) => {
    if (selectedCategory === "All") return true;
    return item.category === selectedCategory;
  });

  return (
    <div className="ShoppingList">
      <ItemForm onAddItem={handleAddItem} />
      <Filter
        category={selectedCategory}
        onCategoryChange={handleCategoryChange}
      />
      <ul className="Items">
        {itemsToDisplay.map((item) => (
          <Item
            key={item.id}
            item={item}
            onDeleteItem={handleDeleteItem}
            onToggleCart={handleToggleCart}
          />
        ))}
      </ul>
    </div>
  );
}

export default ShoppingList;