import { useState, useEffect } from "react";

import ProductCard from "./components/ProductCard";
import SearchBar from "./components/SearchBar";
import { products as productsList } from "./consts";
import httpClient from "../../services/axios";
import Pagination from "../../components/Pagination";

export default function Home() {
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPage] = useState(1);

  const perPage = 10;

  function onSearchHandler(value) {
    if (value) {
      setFilteredProducts(
        productsList.filter((product) =>
          product.name.toLowerCase().includes(value.toLowerCase())
        )
      );
    } else {
      setFilteredProducts(productsList);
    }
  }

  function onChangeSearchHandler(value) {
    if (!value) {
      setFilteredProducts([]);
    }
  }

  function changePage(pageNumber) {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setPage(pageNumber);
    }
  }

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const params = { page, perPage };
        const { data } = await httpClient.get("/products", {
          params,
        });
        setFilteredProducts(data.products);
        setTotalPage(data.numberOfPages);
      } catch (error) {
        console.error(error);
      }
    };
    fetchProducts();
  }, [page]);

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
            {filteredProducts.map((product) => (
              <li key={product.id}>
                <ProductCard product={product} />
              </li>
            ))}
          </ul>
          <div className="flex justify-center mt-3">
            <Pagination
              onClickNext={() => changePage(page + 1)}
              onClickPrevious={() => changePage(page - 1)}
              page={page}
              isPreviousDisabled={page === 1}
              isNextDisabled={page + 1 > totalPages}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
