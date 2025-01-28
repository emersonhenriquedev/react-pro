import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { CategoriesService } from "../../../../../services/categories";
import { schema } from "./consts";
import { useQueryClient, useQuery } from "@tanstack/react-query";

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
  const queryClient = useQueryClient();
  const { data, isLoading } = useQuery({
    queryKey: ["category", categoryId],
    queryFn: () => CategoriesService.findById(categoryId),
    enabled: categoryId ? true : false,
  });

  // useEffect(() => {
  //   const getCategory = async () => {
  //     if (!categoryId) return;
  //     try {
  //       const response = await CategoriesService.findById(categoryId);
  //       const category = response.data;

  //       reset({
  //         name: category.name,
  //       });
  //     } catch (error) {
  //       alert("Categoria não existe.");
  //       console.error(error);
  //       navigate("/dashboard/categories");
  //     }
  //   };
  //   getCategory();
  // }, [navigate, categoryId, reset]);

  useEffect(() => {
    if (!isLoading && data) {
      reset({
        name: data.data.name,
      });
    }
  }, [data, isLoading, reset]);

  async function onSubmit(data) {
    if (categoryId) {
      try {
        await CategoriesService.update(categoryId, data);
        // queryClient.refetchQueries("categories");
        queryClient.setQueryData("categories", (current) => {
          const newCategories = current.data.map((category) => {
            if (category.id.toString() === categoryId) {
              return { ...category, name: data.name };
            }
            return category;
          });
          return { ...current, data: newCategories };
        });
      } catch (error) {
        console.log(error);
        alert(error.response.data.message || "Houve um erro ao editar.");
      } finally {
        navigate("/dashboard/categories");
      }
    } else {
      try {
        const response = await CategoriesService.create(data);
        queryClient.setQueryData("categories", (current) => {
          return { ...current, data: [...current.data, response.data] };
        });
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
