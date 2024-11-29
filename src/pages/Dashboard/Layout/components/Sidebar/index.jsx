import { Link, useNavigate } from "react-router-dom";
import { FaUser, FaProductHunt } from "react-icons/fa";
import { BiCategory } from "react-icons/bi";

export default function Sidebar() {
  const navigate = useNavigate();

  function logoutHandler() {
    localStorage.removeItem('token');
    navigate('/dashboard/login');
  }

  return (
    <aside className="fixed top-0 left-0 flex flex-col justify-between h-full p-8 rounded-tr-lg rounded-br-lg shadow-lg bg-primary w-60">
      <ul className="flex flex-col text-lg text-white gap-y-3">
        <li>
          <Link to="/dashboard" className="flex items-center gap-x-2">
            <FaUser /> Usuários
          </Link>
        </li>
        <li>
          <Link to="/dashboard/products" className="flex items-center gap-x-2">
           <FaProductHunt/> Produtos
          </Link>
        </li>
        <li>
          <Link
            to="/dashboard/categories"
            className="flex items-center gap-x-2"
          >
           <BiCategory /> Categorias
          </Link>
        </li>
      </ul>
      <button onClick={logoutHandler} type="button" className="text-lg text-red-200 w-fit">
        Sair
      </button>
    </aside>
  );
}
