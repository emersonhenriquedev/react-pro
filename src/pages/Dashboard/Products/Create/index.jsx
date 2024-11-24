import ProductForm from "../components/ProductForm";

export default function CreateProduct() {
    return (
        <div className="custom-container">
        <h1 className="text-2xl font-medium">Novo Produto</h1>
        <div className="w-96 mt-4">
          <ProductForm />
        </div>
      </div>
    )
}

