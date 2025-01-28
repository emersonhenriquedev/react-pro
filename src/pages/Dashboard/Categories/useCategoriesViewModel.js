import { CategoriesService } from "../../../services/categories";
import { useQuery } from "@tanstack/react-query";

export default function useCategoriesViewModel() {
  const { data, isLoading, error } = useQuery({
    queryKey: "categories",
    queryFn: CategoriesService.findAll,
    refetchOnMount: false,
  });

  // const [categories, setCategories] = useState();
  // const [isLoading, setIsLoading] = useState(true);

  // useEffect(() => {
  //   const getCategories = async () => {
  //     const { data } = await CategoriesService.findAll();
  //     setCategories(data);
  //     setIsLoading(false);
  //   };
  //   getCategories();
  // }, []);

  // return {
  //   categories,
  //   isLoading
  // };

  return {
    categories: data?.data || [],
    isLoading,
    error,
  };
}
