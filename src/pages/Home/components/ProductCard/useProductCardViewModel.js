import { useContext } from "react";
import { cartContext } from "../../../../contexts/cartContext";

export default function useProductCardViewModel(product) {
  const { addItem } = useContext(cartContext);

  function addToCart() {
    addItem(product);
  }

  return {
    addToCart,
  };
}
