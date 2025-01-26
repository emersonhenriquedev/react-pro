import { Link } from "react-router-dom";
import Pagination from "../../components/Pagination";
import useDashboardViewModel from "./useDashboardViewModel";

export default function Dashboard() {
  const { users, changePage, page, totalPages } = useDashboardViewModel();

  return (
    <div className="custom-container">
      <div className="flex items-center justify-between">
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
              <th>Função</th>
              <th>Criação</th>
              <th>Atualização</th>
            </tr>
          </thead>
          <tbody>
            {users &&
              users.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.role.name}</td>
                  <td>{user.createdAt}</td>
                  <td>{user.updatedAt}</td>
                  <td>
                    <Link
                      to={`/dashboard/users/edit/${user.id}`}
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
