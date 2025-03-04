import { create } from "zustand";

const useCartStore = create((set) => ({
  total: 0,
  items: [],
  addItem: (product) =>
    set((state) => {
      const index = state.items.findIndex((item) => item.id === product.id);
      if (index !== -1) {
        const listUpdated = state.items.map((item) => {
          if (item.id === product.id) {
            return {
              ...item,
              qty: item.qty + 1,
              subtotal: item.price * (item.qty + 1),
            };
          }
          return item;
        });
        // setItems(listUpdated);
        return { items: listUpdated, total: calculateTotal(listUpdated) };
      } else {
        const data = [
          ...state.items,
          { ...product, qty: 1, subtotal: product.price },
        ];
        // updateLocalStorage(data);

        return { items: data, total: calculateTotal(data) };
      }
    }),
  removeItem: (id) =>
    set((state) => {
      const newItems = state.items.filter((item) => item.id != id);
      return { items: newItems, total: calculateTotal(newItems) };
    }),
  incrementItem: (id) =>
    set((state) => {
      const updatedItems = state.items.map((item) =>
        item.id === id
          ? {
              ...item,
              qty: item.qty + 1,
              subtotal: (item.qty + 1) * item.price,
            }
          : item
      );
      return { items: updatedItems, total: calculateTotal(updatedItems) };
    }),
  decrementItem: (id) =>
    set((state) => {
      const updatedItems = state.items.map((item) =>
        item.id === id && item.qty > 1
          ? {
              ...item,
              qty: item.qty - 1,
              subtotal: (item.qty - 1) * item.price,
            }
          : item
      );
      return { items: updatedItems, total: calculateTotal(updatedItems) };
    }),
  updateLocalStorage: () => {},
}));

function calculateTotal(items) {
  return items.reduce((acc, curr) => curr.subtotal + acc, 0);
}

export { useCartStore };
