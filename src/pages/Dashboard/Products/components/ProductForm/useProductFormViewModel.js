import { useEffect, useState } from "react";
import httpClient from "../../../../../services/axios";
import { currencyMask } from "./currencyMask";
import currency from "currency.js";
import { useNavigate } from "react-router-dom";
import { schema } from "./consts";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

export default function useProductFormViewModel(productId) {
  const [categories, setCategories] = useState([]);
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

  async function uploadImage(id, file) {
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
    const body = {
      name: data.name,
      price: currency(data.price).value,
      stock: data.stock,
      description: data.description,
      categoryId: data.category,
    };

    if (productId) {
      try {
        await httpClient.put(`/products/${productId}`, body);
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
        const response = await httpClient.post("/products", body);
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
    if (!productId) return;
    const getProduct = async () => {
      try {
        const response = await httpClient.get(`/products/${productId}`);
        reset({
          name: response.data.name,
          category: response.data.category.id.toString(),
          price: response.data.price.toFixed(2),
          description: response.data.description,
          stock: response.data.stock.toString(),
          file: response.data.imgSrc,
        });
      } catch (error) {
        console.error(error);
      }
    };
    getProduct();
  }, [productId]);

  return {
    onSubmitHandler,
    onPriceChangeHandler,
    onStockChangleHandler,
    handleSubmit,
    file,
    register,
    errors,
    categories,
    isDirty,
    isSubmitting,
    isValid,
    control,
    reset,
  };
}
