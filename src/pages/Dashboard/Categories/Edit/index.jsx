import CategoryForm from "../components/CategoryForm";
import { useParams } from "react-router-dom";

export default function EditCategory() {
  const params = useParams();
  return (
    <div className="custom-container">
      <h1 className="text-2xl font-medium">Editar Categoria</h1>
      <div className="mt-4 w-96">
        <CategoryForm categoryId={params.categoryId} />
      </div>
    </div>
  );
}
