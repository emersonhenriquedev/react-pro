import { Outlet} from "react-router-dom";
import Sidebar from "./components/Sidebar";

export default function Layout() {

  return (
    <>
      <Sidebar />
      <main className="py-8 ml-60">
        <Outlet />
      </main>
    </>
  );
}
