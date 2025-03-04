import { useCartStore } from "../../../../stores/cartStore";

export default function useProductCardViewModel(product) {
  const cartStore = useCartStore();

  function addToCart() {
    cartStore.addItem(product);
  }

  return {
    addToCart,
  };
}
