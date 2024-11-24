import { useState } from "react";
import { Link } from "react-router-dom";

export default function Products() {
  const products = [
    {
      id: 1,
      name: "Celular",
      category: "Celulares",
      price: 10,
      stock: 2,
      image: "https://t62533.vteximg.com.br/arquivos/ids/930713-1000-1000/celular-samsung-a53-5g-128gb-dual-chip-2.jpg?v=638266913500030000",
      created_at: "2024-11-19",
      updated_at: "2024-11-19",
    },
    {
      id: 2,
      name: "TV",
      category: "TVs",
      price: 8,
      stock: 2,
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTCu6sgUeTmYLu3WRulbqAr6u4Tqz3UObpe8A&s",
      created_at: "2024-11-19",
      updated_at: "2024-11-19",
    },
    {
      id: 3,
      name: "Smartwatch",
      category: "Smartwatches",
      price: 11,
      stock: 2,
      image: "https://d1r6yjixh9u0er.cloudfront.net/Custom/Content/Products/47/92/4792_smartwatch-xiaomi-redmi-watch-3-x00755_m6_638277063990005751.webp",
      created_at: "2024-11-19",
      updated_at: "2024-11-19",
    },
    {
      id: 4,
      name: "Notebook",
      category: "Notebooks",
      price: 16,
      stock: 2,
      image: "https://www.notebookcheck.info/uploads/tx_nbc2/pro13_02.jpg",
      created_at: "2024-11-19",
      updated_at: "2024-11-19",
    },
    {
      id: 5,
      name: "Tablet",
      category: "Tablets",
      price: 7,
      stock: 2,
      image: "https://m.media-amazon.com/images/I/71-hJGtkLWL.jpg",
      created_at: "2024-11-19",
      updated_at: "2024-11-19",
    },
    {
      id: 6,
      name: "PC",
      category: "PCs",
      price: 12,
      stock: 2,
      image: "https://www.punchtechnology.co.uk/wp-content/uploads/2024/02/vida2-1.jpg",
      created_at: "2024-11-19",
      updated_at: "2024-11-19",
    },
  ];

  const [page, setPage] = useState(1);

  const perPage = 2;
  const totalPages = Math.ceil(products.length / perPage);

  function handleShowMore() {
    setPage(page + 1);
  }

  return (
    <div className="custom-container">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-medium">Produtos</h1>
        <Link to="/dashboard/products/create" className="btn text-primary">
          Novo Produto
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="table mt-4">
          <thead>
            <tr>
              <th>Id</th>
              <th>Imagem</th>
              <th>Nome</th>
              <th>Preço</th>
              <th>Estoque</th>
              <th>Categoria</th>
              <th>Criação</th>
              <th>Atualização</th>
            </tr>
          </thead>
          <tbody>
            {products.slice(0, perPage * page).map((product) => (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td>
                    <img src={product.image} alt={product.name} className="w-20 h-20   " />
                </td>
                <td>{product.name}</td>
                <td>{product.price}</td>
                <td>{product.stock}</td>
                <td>{product.category}</td>
                <td>{product.created_at}</td>
                <td>{product.updated_at}</td>
                <td>
                  <Link
                    to={`/dashboard/products/edit/${product.id}`}
                    className="text-blue-400"
                  >
                    Editar
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-center">
        {page < totalPages && (
          <button
            onClick={handleShowMore}
            type="button"
            className="mt-4 text-primary"
          >
            Mostrar mais
          </button>
        )}
      </div>
    </div>
  );
}
