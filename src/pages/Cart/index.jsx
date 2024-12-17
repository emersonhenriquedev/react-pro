import { FaTrash } from "react-icons/fa";
import { GoPlus } from "react-icons/go";
import { FiMinus } from "react-icons/fi";
import { useContext } from "react";
import formatToCurrency from "../../utils/formatToCurrency";
import { cartContext } from "../../contexts/cartContext";
import { BASE_URL } from '../../consts';
export default function Cart() {
  const { items, removeItem, incrementItem, decrementItem, total } =
    useContext(cartContext);

  return (
    <div>
      <main className="min-h-screen pt-10">
        <span className="block mb-6 text-2xl font-medium text-right">
          Total: {formatToCurrency(total)}
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
                    src={item.imgSrc ? `${BASE_URL}${item.imgSrc}`: '/default-image.webp'}
                    alt={item.name}
                    className="object-contain w-20 h-20 "
                  />
                </td>
                <td>{item.name}</td>
                <td>{formatToCurrency(item.price)}</td>
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
                <td> {formatToCurrency(item.subtotal)}</td>
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
