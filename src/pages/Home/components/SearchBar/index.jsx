import { IoSearchOutline } from "react-icons/io5";
import { useForm } from "react-hook-form";
import PropTypes from "prop-types";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const schema = yup.object({
  search: yup.string().required(),
});

export default function SearchBar({ onSearch, onChange }) {
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

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex items-center gap-x-2"
    >
      <input
        type="search"
        name="search"
        className="w-3/4 p-2 border rounded-l outline-none"
        placeholder="Pesquisar produto"
        {...register("search", { onChange: onChangeHandler })}
      />
      <button
        type="submit"
        className="flex items-center justify-center w-10 h-10 p-2 text-white rounded-full bg-primary"
      >
        <IoSearchOutline className="text-3xl" />
      </button>
    </form>
  );
}

SearchBar.propTypes = {
  onSearch: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
};
