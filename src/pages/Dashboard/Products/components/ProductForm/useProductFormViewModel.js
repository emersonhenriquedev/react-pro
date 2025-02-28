import { useEffect } from "react";
import { currencyMask } from "./currencyMask";
import currency from "currency.js";
import { useNavigate } from "react-router-dom";
import { schema } from "./consts";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ProductsService } from "../../../../../services/products/index";
import { useQuery } from "@tanstack/react-query";
import { CategoriesService } from "../../../../../services/categories";

export default function useProductFormViewModel(productId) {
  const navigate = useNavigate();
  const {
    register,
    formState: { errors, isDirty, isSubmitting, isValid },
    handleSubmit,
    setValue,
    reset,
    watch,
    control,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const file = watch("file");

  const { data: productData, isLoading } = useQuery({
    queryKey: ["product", productId],
    queryFn: () => ProductsService.findById(productId),
    enabled: productId ? true : false,
  });

  const { data: categoriesData } = useQuery({
    queryKey: ["categories"],
    queryFn: () => CategoriesService.findAll(),
  });

  async function uploadImage(id, file) {
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      try {
        await ProductsService.upload(id, formData);
      } catch (error) {
        alert("Ocorreu um erro");
      }
    }
  }

  async function onSubmitHandler(data) {
    const body = {
      name: data.name,
      price: currency(data.price).value,
      stock: data.stock,
      description: data.description,
      categoryId: data.category,
    };

    if (productId) {
      try {
        await ProductsService.update(productId, body);
        if (typeof data.file !== "string") {
          await uploadImage(productId, data.file);
        }
        navigate("/dashboard/products");
      } catch (error) {
        alert("Ocorreu um erro ao editar o produto!");
        console.error(error);
      }
    } else {
      try {
        const response = await ProductsService.create(body);
        await uploadImage(response.data.id, data.file);
        alert(`Produto ${response.data.name} criado com sucesso!`);
        navigate("/dashboard/products");
      } catch (error) {
        console.error(error);
      }
    }
    console.log(data);
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
    if (!productId || isLoading) return;
    const getProduct = async () => {
      try {
        reset({
          name: productData.data.name,
          category: productData.data.category.id.toString(),
          price: productData.data.price.toFixed(2),
          description: productData.data.description,
          stock: productData.data.stock.toString(),
          file: productData.data.imgSrc,
        });
      } catch (error) {
        console.error(error);
      }
    };
    getProduct();
  }, [productId, isLoading]);

  return {
    onSubmitHandler,
    onPriceChangeHandler,
    onStockChangleHandler,
    handleSubmit,
    file,
    register,
    errors,
    categories: categoriesData?.data || [],
    isDirty,
    isSubmitting,
    isValid,
    isLoading,
    control,
    reset,
  };
}
