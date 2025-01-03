import { Link } from "react-router-dom";
import { format } from "date-fns";
import formatToCurrency from "../../../utils/formatToCurrency";
import Pagination from "../../../components/Pagination";
import useFetchProducts from "../../../hooks/useFetchProducts";

export default function Products() {
  const { page, products, changePage, totalPages } = useFetchProducts({});

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
                    src={
                      product.imgSrc
                        ? `http://localhost:3000/${product.imgSrc}`
                        : "/default-image.webp"
                    }
                    alt={product.imgSrc}
                    className="w-20 h-20"
                  />
                </td>
                <td>{product.name}</td>
                <td>{formatToCurrency(product.price)}</td>
                <td>{product.stock}</td>
                <td>{product.category.name}</td>
                <td>{format(product.createdAt, "yyyy/MM/dd")}</td>
                <td>
                  {product.updatedAt && format(product.updatedAt, "dd/MM/yyyy")}
                </td>
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
        <Pagination
          onClickNext={() => changePage(page + 1)}
          onClickPrevious={() => changePage(page - 1)}
          page={page}
          isPreviousDisabled={page === 1}
          isNextDisabled={page + 1 > totalPages}
        />
      </div>
    </div>
  );
}
