import { IoSearchOutline } from "react-icons/io5";
import PropTypes from "prop-types";
import useSearchBarViewModel from "./useSearchBarViewModel";
export default function SearchBar({ onSearch, onChange }) {
  const { handleSubmit, register, onSubmit, onChangeHandler } =
    useSearchBarViewModel(onSearch, onChange);

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
