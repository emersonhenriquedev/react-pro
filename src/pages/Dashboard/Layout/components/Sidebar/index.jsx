import { Link } from "react-router-dom";
import { FaUser, FaProductHunt } from "react-icons/fa";
import { BiCategory } from "react-icons/bi";

export default function Sidebar() {
  return (
    <aside className="fixed left-0 top-0 h-full bg-primary w-60 rounded-tr-lg rounded-br-lg p-8 shadow-lg flex flex-col justify-between">
      <ul className="flex flex-col gap-y-3 text-white text-lg">
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
      <button type="button" className="text-red-200 text-lg  w-fit">
        Sair
      </button>
    </aside>
  );
}
