import { useForm } from "react-hook-form";
import PropTypes from "prop-types";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import httpClient from "../../../../../services/axios";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const schema = yup.object({
  name: yup
    .string()
    .required("Campo obrigatório")
    .min(3, "Mínimo 3 caracteres"),
});

export default function CategoryForm(props) {
  const {
    register,
    formState: { errors, isDirty },
    handleSubmit,
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const navigate = useNavigate();

  useEffect(() => {
    const getCategory = async () => {
      if (!props.categoryId) return;
      try {
        const response = await httpClient.get(
          `/categories/${props.categoryId}`
        );
        const category = response.data;

        reset({
          name: category.name,
        });
      } catch (error) {
        alert("Categoria não existe.");
        navigate("/dashboard/categories");
      }
    };
    getCategory();
  }, [navigate, props, reset]);

  async function onSubmit(data) {

    if (props.categoryId) {
      try {
        await httpClient.put(`/categories/${props.categoryId}`, data);
        alert("Editado com sucesso");
      } catch (error) {
        console.log(error);
        alert(error.response.data.message || "Houve um erro ao editar.");
        navigate("/dashboard/categories");
      }
    } else {
      try {
        await httpClient.post("/categories", data);
        navigate("/dashboard/categories");
      } catch (error) {
        alert(error.response.data.message || "Houve um erro ao cadastrar.");
      }
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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
      <button
        disabled={!isDirty}
        type="submit"
        className="w-full py-2 text-white rounded-lg mt-7 bg-primary disabled:bg-opacity-30 disabled:cursor-not-allowed"
      >
        {props.categoryId ? "Editar" : "Cadastrar"}
      </button>
    </form>
  );
}

CategoryForm.propType = {
  categoryId: PropTypes.string,
};
