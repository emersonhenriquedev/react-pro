import { PropTypes } from "prop-types";
import { cartContext } from "../../contexts/cartContext";
import { useState, useEffect } from "react";

export default function CartProvider(props) {
  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const cartItems = localStorage.getItem("cartItems");
    if (cartItems) {
      setItems(JSON.parse(cartItems));
    }
  }, []);

  useEffect(() => {
    const t = items.reduce((acc, curr) => curr.subtotal + acc, 0);
    setTotal(t);
  }, [items]);

  function addItem(product) {
    const index = items.findIndex((item) => item.id === product.id);
    if (index !== -1) {
      const listUpdated = items.map((item) => {
        if (item.id === product.id) {
          return {
            ...item,
            qty: item.qty + 1,
            subtotal: item.price * (item.qty + 1),
          };
        }
        return item;
      });
      updateLocalStorage(listUpdated);
      setItems(listUpdated);
    } else {
      const data = [...items, { ...product, qty: 1, subtotal: product.price }];
      updateLocalStorage(data);
      setItems(data);
    }
  }

  function removeItem(id) {
    const newItems = items.filter((item) => item.id != id);
    updateLocalStorage(newItems);
    setItems(newItems);
  }

  function incrementItem(id) {
    const updatedItems = items.map((item) =>
      item.id === id
        ? { ...item, qty: item.qty + 1, subtotal: (item.qty + 1) * item.price }
        : item
    );
    updateLocalStorage(updatedItems);
    setItems(updatedItems);
  }

  function decrementItem(id) {
    const updatedItems = items.map((item) =>
      item.id === id && item.qty > 1
        ? { ...item, qty: item.qty - 1, subtotal: (item.qty - 1) * item.price }
        : item
    );
    updateLocalStorage(updatedItems);
    setItems(updatedItems);
  }

  function updateLocalStorage(data) {
    localStorage.setItem("cartItems", JSON.stringify(data));
  }

  return (
    <cartContext.Provider
      value={{
        items,
        setItems,
        addItem,
        total,
        removeItem,
        incrementItem,
        decrementItem,
      }}
    >
      {props.children}
    </cartContext.Provider>
  );
}

CartProvider.propTypes = {
  children: PropTypes.node,
};
