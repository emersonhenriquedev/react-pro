import { useCartStore } from "../../../../stores/cartStore";

export default function useProductCardViewModel(product) {
  const { addItem } = useCartStore();

  function addToCart() {
    addItem(product);
  }

  return {
    addToCart,
  };
}
