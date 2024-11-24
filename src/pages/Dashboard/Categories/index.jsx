import { useState } from "react";
import { Link } from "react-router-dom";

export default function Categories() {
  const categories = [
    {
      id: 1,
      name: "Celulares",
      qtyProducts: 10,
      created_at: "2024-11-19",
      updated_at: "2024-11-19",
    },
    {
      id: 2,
      name: "TVs",
      qtyProducts: 8,
      created_at: "2024-11-19",
      updated_at: "2024-11-19",
    },
    {
      id: 3,
      name: "Smartwatches",
      qtyProducts: 11,
      created_at: "2024-11-19",
      updated_at: "2024-11-19",
    },
    {
      id: 4,
      name: "Notebooks",
      qtyProducts: 16,
      created_at: "2024-11-19",
      updated_at: "2024-11-19",
    },
    {
      id: 5,
      name: "Tablets",
      qtyProducts: 7,
      created_at: "2024-11-19",
      updated_at: "2024-11-19",
    },
    {
      id: 6,
      name: "PCs",
      qtyProducts: 12,
      created_at: "2024-11-19",
      updated_at: "2024-11-19",
    },
  ];

  const [page, setPage] = useState(1);

  const perPage = 2;
  const totalPages = Math.ceil(categories.length / perPage);

  function handleShowMore() {
    setPage(page + 1);
  }

  return (
    <div className="custom-container">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-medium">Categorias</h1>
        <Link to="/dashboard/categories/create" className="btn text-primary">
          Nova Categoria
        </Link>
      </div>

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
            {categories.slice(0, perPage * page).map((category) => (
              <tr key={category.id}>
                <td>{category.id}</td>
                <td>{category.name}</td>
                <td>{category.qtyProducts}</td>
                <td>{category.created_at}</td>
                <td>{category.updated_at}</td>
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
      <div className="flex justify-center">
        {page < totalPages && (
          <button
            onClick={handleShowMore}
            type="button"
            className="mt-4 text-primary"
          >
            Mostrar mais
          </button>
        )}
      </div>
    </div>
  );
}
