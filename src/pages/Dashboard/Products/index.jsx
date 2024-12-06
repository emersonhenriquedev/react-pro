import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import httpClient from "../../../services/axios";
import { format } from "date-fns";
import formatToCurrency from "../../../utils/formatToCurrency";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPage] = useState(1);

  const perPage = 10;

  function changePage(pageNumber) {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setPage(pageNumber);
    }
  }

  async function getProducts() {
    const response = await httpClient.get(
      `/products?page=${page}&perPage=${perPage}`
    );
    setProducts(response.data.products);
    setTotalPage(response.data.numberOfPages);
    console.log(response.data.products);
  }

  useEffect(() => {
    getProducts();
  }, [page]);

  return (
    <div className="custom-container pb-60">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-medium">Produtos</h1>
        <Link to="/dashboard/products/create" className="btn text-primary">
          Novo Produto
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="table mt-4">
          <thead>
            <tr>
              <th>Id</th>
              <th>Imagem</th>
              <th>Nome</th>
              <th>Preço</th>
              <th>Estoque</th>
              <th>Categoria</th>
              <th>Criação</th>
              <th>Atualização</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td>
                  <img
                    src={product.imgSrc ? `http://localhost:3000/${product.imgSrc}` : '/default-image.webp'}
                    alt={product.imgSrc}
                    className="w-20 h-20"
                  />
                </td>
                <td>{product.name}</td>
                <td>{ formatToCurrency(product.price)}</td>
                <td>{product.stock}</td>
                <td>{product.category.name}</td>
                <td>{format(product.createdAt,'yyyy/MM/dd')}</td>
                <td>{product.updatedAt && format(product.updatedAt,'dd/MM/yyyy')}</td>
                <td>
                  <Link
                    to={`/dashboard/products/edit/${product.id}`}
                    className="text-blue-400"
                  >
                    Editar
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-center mt-6">
        <div className="join">
          <button
            disabled={page === 1}
            onClick={() => changePage(page - 1)}
            className="join-item btn"
          >
            «
          </button>
          <button className="join-item btn">Página {page}</button>
          <button
            disabled={page === totalPages}
            onClick={() => changePage(page + 1)}
            className="join-item btn"
          >
            »
          </button>
        </div>
      </div>
    </div>
  );
}
