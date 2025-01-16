import { useState } from "react";
import useFetchProducts from "../../hooks/useFetchProducts";
import { ProductsService } from "../../services/products";

export default function useHomeViewModel() {
  const [searchValue, setSearchValue] = useState("");
  const [searchedProducts, setSearchedProducts] = useState([]);

  const { page, products, changePage, totalPages } = useFetchProducts({});

  async function onSearchHandler(value) {
    if (value) {
      setSearchValue(value);
      const { data } = await ProductsService.search(value);
      setSearchedProducts(data);
    }
  }

  function onChangeSearchHandler(value) {
    if (!value) {
      setSearchValue("");
    }
  }

  return {
    searchValue,
    searchedProducts,
    products,
    page,
    totalPages,
    onSearchHandler,
    onChangeSearchHandler,
    changePage,
  };
}
