import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { CategoriesService } from "../../../../../services/categories";
import { schema } from "./consts";

export default function useCategoryFormViewModel(categoryId) {
  const {
    register,
    formState: { errors, isDirty, isSubmitting },
    handleSubmit,
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const navigate = useNavigate();

  useEffect(() => {
    const getCategory = async () => {
      if (!categoryId) return;
      try {
        const response = await CategoriesService.findById(categoryId);
        const category = response.data;

        reset({
          name: category.name,
        });
      } catch (error) {
        alert("Categoria não existe.");
        console.error(error);
        navigate("/dashboard/categories");
      }
    };
    getCategory();
  }, [navigate, categoryId, reset]);

  async function onSubmit(data) {
    if (categoryId) {
      try {
        await CategoriesService.update(categoryId, data);
        alert("Editado com sucesso");
      } catch (error) {
        console.log(error);
        alert(error.response.data.message || "Houve um erro ao editar.");
        navigate("/dashboard/categories");
      }
    } else {
      try {
        await CategoriesService.create(data);
        navigate("/dashboard/categories");
      } catch (error) {
        alert(error.response.data.message || "Houve um erro ao cadastrar.");
      }
    }
  }

  return {
    errors,
    isDirty,
    isSubmitting,
    register,
    handleSubmit,
    onSubmit,
  };
}
