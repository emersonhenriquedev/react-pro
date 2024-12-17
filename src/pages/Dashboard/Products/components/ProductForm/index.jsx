import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import PropTypes from "prop-types";
import { schema } from "./consts";
import DropFileZone from "./components/DropFileZone";
import { useEffect, useState } from "react";
import httpClient from "../../../../../services/axios";
import { currencyMask } from "./currencyMask";
import currency from "currency.js";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../../../../consts";

export default function ProductForm(props) {
  const [file, setFile] = useState();
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();
  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  async function uploadImage(id) {
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      try {
        await httpClient.post(`/products/${id}/uploadImage`, formData);
      } catch (error) {
        alert("Ocorreu um erro");
      }
    }
  }

  async function onSubmitHandler(data) {
    // TODO: intregar com a api
    const body = {
      name: data.name,
      price: currency(data.price).value,
      stock: data.stock,
      description: data.description,
      categoryId: data.category,
    };

    if (props.productId) {
      try {
        await httpClient.put(`/products/${props.productId}`, body);
        if(typeof file !== 'string') {
          await uploadImage(props.productId);
        }
        navigate("/dashboard/products");
      } catch (error) {
        alert("Ocorreu um erro ao editar o produto!");
        console.error(error);
      }
    } else {
      try {
        const response = await httpClient.post("/products", body);
        await uploadImage(response.data.id);
        alert(`Produto ${response.data.name} criado com sucesso!`);
        navigate("/dashboard/products");
      } catch (error) {
        console.error(error);
      }
    }
    console.log(data);
  }

  function onDropHandler(files) {
    setFile(files[0]);
    // TODO: fazer envio do arquivo
  }

  function onPriceChangeHandler(event) {
    const { value } = event.target;
    setValue("price", currencyMask(value));
  }

  function onStockChangleHandler(event) {
    const { value } = event.target;
    setValue("stock", value.replace(/\D/g, ""));
  }

  useEffect(() => {
    const getCategories = async () => {
      try {
        const response = await httpClient.get("/categories");
        setCategories(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    getCategories();
  }, []);

  useEffect(() => {
    if (!props.productId) return;
    const getProduct = async () => {
      try {
        const response = await httpClient.get(`/products/${props.productId}`);
        setFile(response.data.imgSrc);

        reset({
          name: response.data.name,
          category: response.data.category.id,
          price: response.data.price.toFixed(2),
          description: response.data.description,
          stock: response.data.stock,
        });
      } catch (error) {
        console.error(error);
      }
    };
    getProduct();
  }, [props.productId]);

  return (
    <form
      onSubmit={handleSubmit(onSubmitHandler)}
      className="flex flex-col gap-y-3"
    >
      <div>
        {file ? (
          <div className="flex justify-center">
            <div className="w-40 h-40 mb-4">
              {props.productId ? (
                <img
                  className="object-cover w-full h-full"
                  src={
                    typeof file === 'string'
                      ? `${BASE_URL}${file}`
                      : URL.createObjectURL(file)
                  }
                  alt={file}
                />
              ) : null}
            </div>
          </div>
        ) : null}

        <DropFileZone onDrop={onDropHandler} />
        {file?.name}
      </div>
      <div className="flex flex-col gap-y-1">
        <label htmlFor="name">Nome</label>
        <input
          name="name"
          type="text"
          className="w-full px-3 py-1 border rounded-lg outline-none"
          placeholder="Nome"
          {...register("name")}
        />
        <span className="text-red-400">{errors.name?.message}</span>
      </div>

      <div className="flex flex-col gap-y-1">
        <label htmlFor="price">Preço</label>
        <input
          name="price"
          type="text"
          className="w-full px-3 py-1 border rounded-lg outline-none"
          placeholder="Preço"
          {...register("price", { onChange: onPriceChangeHandler })}
        />
        <span className="text-red-400">{errors.price?.message}</span>
      </div>

      <div className="flex flex-col gap-y-1">
        <label htmlFor="category">Categoria</label>
        <select
          name="category"
          className="w-full px-3 py-2 border rounded-lg outline-none"
          {...register("category")}
        >
          <option value="">Selecione uma categoria</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
        <span className="text-red-400">{errors.category?.message}</span>
      </div>

      <div className="flex flex-col gap-y-1">
        <label htmlFor="stock">Estoque</label>
        <input
          name="stock"
          type="text"
          className="w-full px-3 py-1 border rounded-lg outline-none"
          placeholder="Estoque"
          {...register("stock", { onChange: onStockChangleHandler })}
        />
        <span className="text-red-400">{errors.stock?.message}</span>
      </div>

      <div className="flex flex-col gap-y-1">
        <label htmlFor="description">Descrição</label>
        <textarea
          id="description"
          className="p-2 border rounded-lg outline-none h-36"
          placeholder="Descrição"
          {...register("description")}
        ></textarea>
        <span className="text-red-400">{errors.description?.message}</span>
      </div>

      <button
        type="submit"
        className="w-full py-2 text-white rounded-lg mt-7 bg-primary"
      >
        {props.productId ? "Editar" : "Cadastrar"}
      </button>
    </form>
  );
}

ProductForm.propType = {
  productId: PropTypes.string,
};
