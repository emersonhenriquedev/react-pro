import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

const storeCallback = (set) => ({
  total: 0,
  items: [],
  totalItems: 0,
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

        return {
          items: listUpdated,
          total: calculateTotal(listUpdated),
          totalItems: getTotalItems(listUpdated),
        };
      } else {
        const data = [
          ...state.items,
          { ...product, qty: 1, subtotal: product.price },
        ];

        return {
          items: data,
          total: calculateTotal(data),
          totalItems: getTotalItems(data),
        };
      }
    }),
  removeItem: (id) =>
    set((state) => {
      const newItems = state.items.filter((item) => item.id != id);
      return {
        items: newItems,
        total: calculateTotal(newItems),
        totalItems: getTotalItems(newItems),
      };
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
      return {
        items: updatedItems,
        total: calculateTotal(updatedItems),
        totalItems: getTotalItems(updatedItems),
      };
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
      return {
        items: updatedItems,
        total: calculateTotal(updatedItems),
        totalItems: getTotalItems(updatedItems),
      };
    }),
  updateLocalStorage: () => {},
});

const useCartStore = create(
  persist(storeCallback, {
    name: "cart-storage",
    storage: createJSONStorage(() => localStorage),
  })
);

function calculateTotal(items) {
  return items.reduce((acc, curr) => curr.subtotal + acc, 0);
}

function getTotalItems(items) {
  return items.reduce((acc, curr) => curr.qty + acc, 0);
}

export { useCartStore };
