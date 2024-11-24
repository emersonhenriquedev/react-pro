import UserForm from "../components/UserForm";
import { useParams } from "react-router-dom";

export default function EditUser() {
  const params = useParams();

  return (
    <div className="custom-container">
      <h1 className="text-2xl font-medium">Editar usuário</h1>
      <div className="w-96 mt-4">
        <UserForm userId={params.userId} />
      </div>
    </div>
  );
}
