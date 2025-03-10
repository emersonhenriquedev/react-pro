import ProductCard from "./components/ProductCard";
import SearchBar from "./components/SearchBar";
import Pagination from "../../components/Pagination";
import useHomeViewModel from "./useHomeViewModel";
import Spinner from "../../components/Spinner";
export default function Home() {
  const {
    searchValue,
    searchedProducts,
    products,
    page,
    totalPages,
    isLoading,
    onSearchHandler,
    onChangeSearchHandler,
    changePage,
  } = useHomeViewModel();

  return (
    <div className="min-h-screen ">
      <main className="pt-12 pb-60">
        <SearchBar
          onSearch={onSearchHandler}
          onChange={onChangeSearchHandler}
        />
        <div className="mt-10">
          <h1 className="text-4xl font-medium">Produtos</h1>
          {isLoading ? (
            <div className="flex justify-center pt-10">
              <Spinner />
            </div>
          ) : (
            <>
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
            </>
          )}

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
