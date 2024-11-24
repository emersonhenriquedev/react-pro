import { useForm } from "react-hook-form";
import PropTypes from "prop-types";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const schema = yup.object({
  name: yup
    .string()
    .required("Campo obrigatório")
    .min(3, "Mínimo 3 caracteres"),
});

export default function CategoryForm(props) {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: { name: props.categoryId ? "default name" : undefined },
  });

  function onSubmit(data) {
    // TODO: intregar com a api
    if (props.categoryId) {
      // TODO: edit user
    } else {
      // TODO: create user
    }
    console.log(data);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-y-1">
        <label htmlFor="name">Nome</label>
        <input
          name="name"
          type="text"
          className="border outline-none px-3 py-1 rounded-lg w-full"
          placeholder="Nome"
          {...register("name")}
        />
        <span className="text-red-400">{errors.name?.message}</span>
      </div>
      <button
        type="submit"
        className="mt-7 rounded-lg bg-primary w-full py-2 text-white"
      >
        {props.categoryId ? "Editar" : "Cadastrar"}
      </button>
    </form>
  );
}

CategoryForm.propType = {
  categoryId: PropTypes.string,
};
