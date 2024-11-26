import { useState } from "react";

import ProductCard from "./components/ProductCard";
import SearchBar from "./components/SearchBar";
import { products as productsList } from "./consts";

export default function Home() {
  const [filteredProducts, setFilteredProducts] = useState(productsList);

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
      setFilteredProducts(productsList);
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
            {filteredProducts.map((product) => (
              <li key={product.id}>
                <ProductCard product={product} />
              </li>
            ))}
          </ul>
        </div>
      </main>
    </div>
  );
}
