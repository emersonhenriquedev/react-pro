import UserForm from "../components/UserForm";

export default function CreateUser() {

  return (
    <div className="custom-container">
      <h1 className="text-2xl font-medium">Novo usuário</h1>
      <div className="w-96 mt-4">
        <UserForm />
      </div>
    </div>
  );
}
