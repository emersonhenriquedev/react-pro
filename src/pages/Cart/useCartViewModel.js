import { useState } from "react";
import { useCartStore } from "../../stores/cartStore";

export default function useCartViewModel() {
  const cartStore = useCartStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [productId, setProductId] = useState(0);

  function onConfirmModal() {
    if (productId) {
      // removeItem(productId);
      cartStore.removeItem(productId);

      setIsModalOpen(false);
      setProductId(null);
    }
  }

  return {
    items: cartStore.items,
    incrementItem: cartStore.incrementItem,
    decrementItem: cartStore.decrementItem,
    total: cartStore.total,
    isModalOpen,
    onConfirmModal,
    setIsModalOpen,
    setProductId,
  };
}
