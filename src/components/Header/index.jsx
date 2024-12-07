import { Link } from "react-router-dom";
import { IoCartOutline } from "react-icons/io5";
import { useContext, useState } from "react";
import { authContext } from "../../contexts/authContext";

export default function Header() {

  const { user } = useContext(authContext);
  return (
    <header className="flex items-center justify-between">
      <Link to="/" className="text-3xl font-bold">
        logo
      </Link>
      <div className="flex items-center gap-x-3">
        <Link to="/cart">
          <IoCartOutline className="text-3xl text-gray-700" />
        </Link>
        {user ? (
          <span>
            Olá, <span className="text-primary">{user.name}</span>
          </span>
        ) : (
          <Link to="/login" className="font-medium text-primary">
            Login
          </Link>
        )}
      </div>
    </header>
  );
}
