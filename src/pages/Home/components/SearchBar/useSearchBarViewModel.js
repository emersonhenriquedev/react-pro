import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "./consts";

export default function useSearchBarViewModel(onSearch, onChange) {
  const { register, handleSubmit, setValue } = useForm({
    resolver: yupResolver(schema),
  });

  function onSubmit({ search }) {
    onSearch(search);
  }

  function onChangeHandler(event) {
    const searchValue = event.target.value;
    setValue("search", searchValue);
    onChange(searchValue);
  }

  return {
    handleSubmit,
    register,
    onSubmit,
    onChangeHandler,
  };
}
