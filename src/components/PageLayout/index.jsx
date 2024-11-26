import { Outlet } from "react-router-dom";
import Header from "../Header";

export default function PageLayout() {
  return (
    <div className="custom-container">
      <Header />
      <Outlet />
    </div>
  );
}
