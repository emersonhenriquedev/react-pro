import { useEffect, useState } from "react";
import { CategoriesService } from "../../../services/categories";

export default function useCategoriesViewModel() {
  const [categories, setCategories] = useState();

  useEffect(() => {
    const getCategories = async () => {
      const { data } = await CategoriesService.findAll();
      setCategories(data);
    };
    getCategories();
  }, []);

  return {
    categories,
  };
}
