import { Link } from "react-router-dom";
import { IoCartOutline } from "react-icons/io5";
import { useState } from "react";

export default function Header() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <header className="flex items-center justify-between">
      <Link to="/" className="text-3xl font-bold">logo</Link>
      <div className="flex items-center gap-x-3">
        <Link to="/cart">
          <IoCartOutline className="text-3xl text-gray-700" />
        </Link>
        {isAuthenticated ? (
          <span>
            Olá, <span className="text-primary">João</span>
          </span>
        ) : (
            <Link to="/login" className="font-medium text-primary">Login</Link>
        )}
      </div>
    </header>
  );
}
