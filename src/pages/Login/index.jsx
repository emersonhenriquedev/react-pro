import RegisterImage from "../../assets/registerLoginImage.svg";
import LoginCard from "./components/LoginCard";
import { useContext, useEffect } from "react";
import { authContext } from "../../contexts/authContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const { user } = useContext(authContext);

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <div className="flex h-screen">
      <div className="flex-1 pr-3 ">
        <img src={RegisterImage} alt="" className="h-full" />
      </div>
      <div className="flex items-center justify-center flex-1 bg-gray-100 border-l">
        <LoginCard />
      </div>
    </div>
  );
}
