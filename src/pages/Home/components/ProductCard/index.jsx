import { IoCartOutline } from "react-icons/io5";
import PropTypes from "prop-types";
import formatToCurrency from "../../../../utils/formatToCurrency";
import { BASE_URL } from "../../../../consts";
import useProductCardViewModel from "./useProductCardViewModel";

export default function ProductCard({ product }) {
  const { addToCart } = useProductCardViewModel(product);

  return (
    <div className="border rounded-lg">
      <div className="h-48">
        <img
          src={`${BASE_URL}${product.imgSrc}`}
          alt={`${BASE_URL}${product.imgSrc}`}
          className="object-cover w-full h-full rounded-t-lg"
        />
      </div>
      <div className="px-4 pt-4 pb-4">
        <h2 className="text-lg font-medium text-gray-800">{product.name}</h2>
        <span className="text-gray-400">Restam {product.stock} no estoque</span>
        <button
          onClick={addToCart}
          type="button"
          className="flex items-center justify-center w-full py-2 mt-6 text-white gap-x-3 bg-primary rounded-2xl"
        >
          <IoCartOutline className="text-3xl text-white" />
          <span className="text-lg font-medium">
            {formatToCurrency(product.price)}
          </span>
        </button>
      </div>
    </div>
  );
}

ProductCard.propTypes = {
  product: PropTypes.shape({
    name: PropTypes.string.isRequired,
    stock: PropTypes.number.isRequired,
    price: PropTypes.number.isRequired,
    imgSrc: PropTypes.string.isRequired,
  }),
};
