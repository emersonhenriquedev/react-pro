import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import PropTypes from "prop-types";

import { schema } from "./consts";
import DropFileZone from "./components/DropFileZone";
import { useState } from "react";

export default function ProductForm(props) {
  const [file, setFile] = useState();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: props.productId
      ? {
          name: "Celular",
          price: 10,
          category: 1,
          image: "",
        }
      : undefined,
  });

  function onSubmit(data) {
    // TODO: intregar com a api
    if (props.userId) {
      // TODO: edit user
    } else {
      // TODO: create user
    }
    console.log(data);
  }

  function onDropHandler(files) {
    setFile(files[0]);
    // TODO: fazer envio do arquivo
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-3">
      <div>
        <DropFileZone onDrop={onDropHandler} />
        {file?.name}
      </div>
      <div className="flex flex-col gap-y-1">
        <label htmlFor="name">Nome</label>
        <input
          name="name"
          type="text"
          className="border outline-none px-3 py-1 rounded-lg w-full"
          placeholder="Nome"
          {...register("name")}
        />
        <span className="text-red-400">{errors.name?.message}</span>
      </div>

      <div className="flex flex-col gap-y-1">
        <label htmlFor="price">Preço</label>
        <input
          name="price"
          type="number"
          className="border outline-none px-3 py-1 rounded-lg w-full"
          placeholder="Preço"
          {...register("price")}
        />
        <span className="text-red-400">{errors.price?.message}</span>
      </div>

      <div className="flex flex-col gap-y-1">
        <label htmlFor="category">Categoria</label>
        <select
          name="category"
          className="border outline-none px-3 py-2 rounded-lg w-full"
          {...register("category")}
        >
          <option value="">Selecione uma categoria</option>
          <option value="1">Celulares</option>
          <option value="2">TVs</option>
        </select>
        <span className="text-red-400">{errors.category?.message}</span>
      </div>

      <div className="flex flex-col gap-y-1">
        <label htmlFor="stock">Estoque</label>
        <input
          name="stock"
          type="number"
          className="border outline-none px-3 py-1 rounded-lg w-full"
          placeholder="Estoque"
          {...register("stock")}
        />
        <span className="text-red-400">{errors.stock?.message}</span>
      </div>

      <button
        type="submit"
        className="mt-7 rounded-lg bg-primary w-full py-2 text-white"
      >
        {props.productId ? "Editar" : "Cadastrar"}
      </button>
    </form>
  );
}

ProductForm.propType = {
  productId: PropTypes.string,
};
