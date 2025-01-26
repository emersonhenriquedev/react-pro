import PropTypes from "prop-types";
import useCategoryFormViewModel from "./useCategoryFormViewModel";
export default function CategoryForm(props) {
  const { 
    handleSubmit,
    isDirty,
    onSubmit,
    isSubmitting,
    errors,
    register } = useCategoryFormViewModel(props.categoryId);

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
        disabled={!isDirty || isSubmitting}
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
