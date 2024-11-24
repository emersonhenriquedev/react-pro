import { useState } from "react";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const users = [
    {
      id: 1,
      name: "João da Silva",
      email: "joao@gmail.com",
      created_at: "2024-11-19",
      updated_at: "2024-11-19",
    },
    {
      id: 2,
      name: "Maria da Silva",
      email: "maria@gmail.com",
      created_at: "2024-11-19",
      updated_at: "2024-11-19",
    },
    {
      id: 3,
      name: "João da Silva",
      email: "joao@gmail.com",
      created_at: "2024-11-19",
      updated_at: "2024-11-19",
    },
    {
      id: 4,
      name: "Maria da Silva",
      email: "maria@gmail.com",
      created_at: "2024-11-19",
      updated_at: "2024-11-19",
    },
    {
      id: 5,
      name: "João da Silva",
      email: "joao@gmail.com",
      created_at: "2024-11-19",
      updated_at: "2024-11-19",
    },
    {
      id: 6,
      name: "Maria da Silva",
      email: "maria@gmail.com",
      created_at: "2024-11-19",
      updated_at: "2024-11-19",
    },
  ];

  const [page, setPage] = useState(1);

  const perPage = 2;
  const totalPages = Math.ceil(users.length / perPage);

  function handleShowMore() {
    setPage(page + 1);
  }

  return (
    <div className="custom-container">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-medium">Usuários</h1>
        <Link to="/dashboard/users/create" className="btn text-primary">
          Novo Usuário
        </Link>
      </div>
      <div className="overflow-x-auto">
        <table className="table mt-4">
          <thead>
            <tr>
              <th>Id</th>
              <th>Nome</th>
              <th>E-mail</th>
              <th>Criação</th>
              <th>Atualização</th>
            </tr>
          </thead>
          <tbody>
            {users.slice(0, perPage * page).map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.created_at}</td>
                <td>{user.updated_at}</td>
                <td>
                  <Link to={`/dashboard/users/edit/${user.id}`} className="text-blue-400">Editar</Link>
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
