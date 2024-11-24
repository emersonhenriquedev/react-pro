import { Outlet } from "react-router-dom";
import Sidebar from "./components/Sidebar";
export default function Layout() {
  return (
    <>
      <Sidebar />
      <main className="ml-60 py-8">
        <Outlet />
      </main>
    </>
  );
}
