import { useEffect, useState } from "react";
// import httpClient from "../services/axios";
import { ProductsService } from "../services/products";
import { useQuery } from "@tanstack/react-query";

export default function useFetchProducts({ perPage = 30 }) {
  //   const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPage] = useState(1);

  const { data, isLoading } = useQuery({
    queryKey: ["products", page],
    queryFn: () => ProductsService.findAll(page, perPage),
  });

  function changePage(pageNumber) {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setPage(pageNumber);
    }
  }

  //   async function fetchProducts(pageNumber) {
  //     try {
  //       const { data } = await ProductsService.findAll(pageNumber, perPage);
  //       setProducts(data.products);
  //       setTotalPage(data.numberOfPages);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   }

  //   async function getProducts() {
  //     const response = await httpClient.get(
  //       `/products?page=${page}&perPage=${perPage}`
  //     );
  //     setProducts(response.data.products);
  //     setTotalPage(response.data.numberOfPages);
  //     console.log(response.data.products);
  //   }

  useEffect(() => {
    // fetchProducts(page);
    setTotalPage(data?.data.numberOfPages || 1);
  }, [data]);

  return {
    products: data?.data.products || [],
    page,
    totalPages,
    isLoading,
    changePage,
  };
}
