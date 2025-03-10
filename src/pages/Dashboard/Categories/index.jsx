import { Link } from "react-router-dom";
import { format } from "date-fns";
import useCategoriesViewModel from "./useCategoriesViewModel";
import Spinner from "../../../components/Spinner";

export default function Categories() {
  const { categories, isLoading } = useCategoriesViewModel();
  return (
    <div className="custom-container">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-medium">Categorias</h1>
        <Link to="/dashboard/categories/create" className="btn text-primary">
          Nova Categoria
        </Link>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center pt-10">
          <Spinner />
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="table mt-4">
            <thead>
              <tr>
                <th>Id</th>
                <th>Nome</th>
                <th>Quantidade de produtos</th>
                <th>Criação</th>
                <th>Atualização</th>
              </tr>
            </thead>
            <tbody>
              {categories?.map((category) => (
                <tr key={category.id}>
                  <td>{category.id}</td>
                  <td>{category.name}</td>
                  <td>{category.productsCount}</td>
                  <td>{format(category.createdAt, "dd/MM/yyyy")}</td>
                  <td>
                    {category.updatedAt &&
                      format(category.updatedAt, "dd/MM/yyyy")}
                  </td>
                  <td>
                    <Link
                      to={`/dashboard/categories/edit/${category.id}`}
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
      )}
    </div>
  );
}
