import { useParams } from "react-router-dom";
import ProductForm from "../components/ProductForm";

export default function EditProduct() {
    const params = useParams();
  return (
    <div className="custom-container">
      <h1 className="text-2xl font-medium">Editar Produto</h1>
      <div className="w-96 mt-4">
        <ProductForm productId={params.productId} />
      </div>
    </div>
  );
}
