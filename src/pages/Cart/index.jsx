import { FaTrash } from "react-icons/fa";
import { GoPlus } from "react-icons/go";
import { FiMinus } from "react-icons/fi";
import { useState, useEffect, useContext } from "react";
import formatToCurrency from "../../utils/formatToCurrency";
import { cartContext } from "../../contexts/cartContext";

export default function Cart() {
  const {items, setItems, total} = useContext(cartContext);
  // const [total, setTotal] = useState(0);

  // useEffect(() => {
  //   const t = items.reduce((acc, curr) => curr.subtotal + acc, 0);
  //   setTotal(t);
  // }, [items]);

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
    <div>
      <main className="min-h-screen px-12 pt-10">
        <span className="block mb-6 text-2xl font-medium text-right">
          Total:{" "}
          {formatToCurrency(total)}
        </span>
        <table className="table w-full">
          <thead>
            <tr>
              <th>Produto</th>
              <th>Nome</th>
              <th>Preço</th>
              <th>Quantidade</th>
              <th>Subtotal</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id}>
                <td>
                  <img
                    src={item.image}
                    alt={item.name}
                    className="object-contain w-20 h-20 "
                  />
                </td>
                <td>{item.name}</td>
                <td>
                  {formatToCurrency(item.price)}
                </td>
                <td>
                  <div className="flex items-center gap-x-2">
                  <button
                      onClick={() => decrementItem(item.id)}
                      type="button"
                    >
                      <FiMinus className="text-lg text-blue-500" />
                    </button>
                    <input
                      type="text"
                      disabled
                      className="w-10 p-2 text-center border-2 rounded-lg"
                      value={item.qty}
                    />

                    <button
                      onClick={() => incrementItem(item.id)}
                      type="button"
                    >
                      <GoPlus className="text-lg text-blue-500" />
                    </button>
                  </div>
                </td>
                <td>
                  {" "}
                  {formatToCurrency(item.subtotal)}
                </td>
                <td>
                  <div>
                    <button
                      onClick={() => removeItem(item.id)}
                      type="button"
                      className="text-lg text-red-400"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex justify-end mt-6">
          <button
            type="button"
            className="px-6 py-3 font-medium text-white bg-primary rounded-xl"
          >
            Finalizar compra
          </button>
        </div>
      </main>
    </div>
  );
}
