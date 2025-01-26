import { useContext, useState } from "react";
import { cartContext } from "../../contexts/cartContext";

export default function useCartViewModel() {
  const { items, removeItem, incrementItem, decrementItem, total } =
    useContext(cartContext);
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
    removeItem,
    incrementItem,
    decrementItem,
    total,
    isModalOpen,
    onConfirmModal,
    setIsModalOpen,
    setProductId,
  };
}
