import PropTypes from "prop-types";
import DropFileZone from "./components/DropFileZone";
import { BASE_URL } from "../../../../../consts";
import useProductFormViewModel from "./useProductFormViewModel";
import { Controller } from "react-hook-form";

export default function ProductForm(props) {
  const {
    onSubmitHandler,
    handleSubmit,
    file,
    register,
    errors,
    onPriceChangeHandler,
    categories,
    onStockChangleHandler,
    isDirty,
    isSubmitting,
    isValid,
    control,
    reset,
  } = useProductFormViewModel(props.productId);

  return (
    <form
      onSubmit={handleSubmit(onSubmitHandler)}
      className="flex flex-col gap-y-3"
    >
      <div>
        {file ? (
          <div className="flex justify-center">
            <div className="w-40 h-40 mb-4">
              {props.productId ? (
                <img
                  className="object-cover w-full h-full"
                  src={
                    typeof file === "string"
                      ? `${BASE_URL}${file}`
                      : URL.createObjectURL(file)
                  }
                  alt={file}
                />
              ) : null}
            </div>
          </div>
        ) : null}
        <Controller
          name="file"
          control={control}
          render={({ field }) => (
            <DropFileZone onDrop={(files) => field.onChange(files[0])} />
          )}
        />

        {file?.name}
      </div>
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

      <div className="flex flex-col gap-y-1">
        <label htmlFor="price">Preço</label>
        <input
          name="price"
          type="text"
          className="w-full px-3 py-1 border rounded-lg outline-none"
          placeholder="Preço"
          {...register("price", { onChange: onPriceChangeHandler })}
        />
        <span className="text-red-400">{errors.price?.message}</span>
      </div>

      <div className="flex flex-col gap-y-1">
        <label htmlFor="category">Categoria</label>
        <select
          name="category"
          className="w-full px-3 py-2 border rounded-lg outline-none"
          {...register("category")}
        >
          <option value="">Selecione uma categoria</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
        <span className="text-red-400">{errors.category?.message}</span>
      </div>

      <div className="flex flex-col gap-y-1">
        <label htmlFor="stock">Estoque</label>
        <input
          name="stock"
          type="text"
          className="w-full px-3 py-1 border rounded-lg outline-none"
          placeholder="Estoque"
          {...register("stock", { onChange: onStockChangleHandler })}
        />
        <span className="text-red-400">{errors.stock?.message}</span>
      </div>

      <div className="flex flex-col gap-y-1">
        <label htmlFor="description">Descrição</label>
        <textarea
          id="description"
          className="p-2 border rounded-lg outline-none h-36"
          placeholder="Descrição"
          {...register("description")}
        ></textarea>
        <span className="text-red-400">{errors.description?.message}</span>
      </div>

      <button
        type="submit"
        className="w-full py-2 text-white rounded-lg mt-7 bg-primary disabled:opacity-30 disabled:cursor-not-allowed"
        disabled={!isDirty || isSubmitting || !isValid}
      >
        {props.productId ? "Editar" : "Cadastrar"}
      </button>
      <button type="button" onClick={() => reset()} className="py-2 border rounded-lg">Resetar</button>
    </form>
  );
}

ProductForm.propType = {
  productId: PropTypes.string,
};
