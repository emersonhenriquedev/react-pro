import { PropTypes } from "prop-types";
import { cartContext } from "../../contexts/cartContext";
import { useState, useEffect } from "react";

export default function CartProvider(props) {
  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);

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

      setItems(listUpdated);
    } else {
      setItems([...items, { ...product, qty: 1, subtotal: product.price }]);
    }
  }

  function removeItem(id) {
    const newItems = items.filter((item) => item.id != id);
    setItems(newItems);
  }

  function incrementItem(id) {
    const updatedItems = items.map((item) =>
      item.id === id
        ? { ...item, qty: item.qty + 1, subtotal: (item.qty + 1) * item.price }
        : item
    );

    setItems(updatedItems);
  }

  function decrementItem(id) {
    const updatedItems = items.map((item) =>
      item.id === id && item.qty > 1
        ? { ...item, qty: item.qty - 1, subtotal: (item.qty - 1) * item.price }
        : item
    );
    setItems(updatedItems);
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
