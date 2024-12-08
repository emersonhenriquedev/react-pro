import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import { useContext, useEffect } from "react";
import { authContext } from "../../../contexts/authContext";

export default function Layout() {
  const navigate = useNavigate();
  const { user } = useContext(authContext);
  // useEffect(() => {
  //   console.log(user);
  //   if (!user) {
  //     navigate("/");
  //   }
  // }, [user, navigate]);

  return (
    <>
      <Sidebar />
      <main className="py-8 ml-60">
        <Outlet />
      </main>
    </>
  );
}
