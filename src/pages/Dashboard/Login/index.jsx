import DashboardLoginImage from "../../../assets/dashboardLoginImage.svg";
import LoginCard from "./components/LoginCard";

export default function DashboardLogin() {
  return (
    <div className="flex h-screen">
      <div className=" flex-1 pr-3">
        <img src={DashboardLoginImage} alt="" />
      </div>
      <div className="bg-gray-100 flex justify-center items-center flex-1 border-l">
        <LoginCard />
      </div>
    </div>
  );
}
