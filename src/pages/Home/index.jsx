import { useState, useEffect } from "react";

import ProductCard from "./components/ProductCard";
import SearchBar from "./components/SearchBar";
import httpClient from "../../services/axios";
import Pagination from "../../components/Pagination";
import useFetchProducts from "../../hooks/useFetchProducts";

export default function Home() {
  const [searchValue, setSearchValue] = useState("");
  const [searchedProducts, setSearchedProducts] = useState([]);

  const { page, products, changePage, totalPages } = useFetchProducts({});

  async function onSearchHandler(value) {
    if (value) {
      setSearchValue(value);
      const { data } = await httpClient.get(`/products/search/${value}`);
      setSearchedProducts(data);
    }
  }

  function onChangeSearchHandler(value) {
    if (!value) {
      setSearchValue("");
    }
  }

  return (
    <div className="min-h-screen ">
      <main className="pt-12 pb-60">
        <SearchBar
          onSearch={onSearchHandler}
          onChange={onChangeSearchHandler}
        />
        <div className="mt-10">
          <h1 className="text-4xl font-medium">Produtos</h1>
          <ul className="grid grid-cols-4 gap-6 mt-6">
            {searchValue
              ? searchedProducts.map((product) => (
                  <li key={product.id}>
                    <ProductCard product={product} />
                  </li>
                ))
              : products.map((product) => (
                  <li key={product.id}>
                    <ProductCard product={product} />
                  </li>
                ))}
          </ul>

          {searchValue ? null : (
            <div className="flex justify-center mt-3">
              <Pagination
                onClickNext={() => changePage(page + 1)}
                onClickPrevious={() => changePage(page - 1)}
                page={page}
                isPreviousDisabled={page === 1}
                isNextDisabled={page + 1 > totalPages}
              />
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
