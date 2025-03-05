import { useState } from "react";
import { useCartStore } from "../../stores/cartStore";

export default function useCartViewModel() {
  const { items, incrementItem, decrementItem, removeItem, total } =
    useCartStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [productId, setProductId] = useState(0);

  function onConfirmModal() {
    if (productId) {
      removeItem(productId);

      setIsModalOpen(false);
      setProductId(null);
    }
  }

  return {
    items,
    incrementItem,
    decrementItem,
    total,
    isModalOpen,
    onConfirmModal,
    setIsModalOpen,
    setProductId,
  };
}
