import CategoryForm from "../components/CategoryForm";

export default function CreateCategory() {
  return (
    <div className="custom-container">
      <h1 className="text-2xl font-medium">Nova Categoria</h1>
      <div className="w-96 mt-4">
        <CategoryForm />
      </div>
    </div>
  );
}
