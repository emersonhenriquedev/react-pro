import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import PropTypes from "prop-types";

import { schema } from "./consts";

export default function UserForm(props) {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: props.userId
      ? {
          name: "joão",
          email: "joao@gmail.com",
          password: "1234",
          role: 1,
        }
      : undefined,
  });

  function onSubmit(data) {
    // TODO: intregar com a api
    if (props.userId) {
      // TODO: edit user
    } else {
      // TODO: create user
    }
    console.log(data);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-3">
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

      <div className="flex flex-col gap-y-1">
        <label htmlFor="email">Email</label>
        <input
          name="email"
          type="email"
          className="border outline-none px-3 py-1 rounded-lg w-full"
          placeholder="Email"
          {...register("email")}
        />
        <span className="text-red-400">{errors.email?.message}</span>
      </div>

      {!props.userId && (
        <div className="flex flex-col gap-y-1">
          <label htmlFor="password">Senha</label>
          <input
            name="password"
            type="password"
            className="border outline-none px-3 py-1 rounded-lg w-full"
            placeholder="Senha"
            {...register("password")}
          />
          <span className="text-red-400">{errors.password?.message}</span>
        </div>
      )}

      {/* <div className="flex flex-col gap-y-1">
        <label htmlFor="email">Confirme sua senha</label>
        <input
          name="passwordConfirm"
          type="password"
          className="border outline-none px-3 py-1 rounded-lg w-full"
          placeholder="Senha"
          {...register("passwordConfirm")}
        />
        <span className="text-red-400">{errors.passwordConfirm?.message}</span>
      </div> */}

      <div className="flex flex-col gap-y-1">
        <label htmlFor="role">Cargo</label>
        <select
          name="role"
          className="border outline-none px-3 py-2 rounded-lg w-full"
          {...register("role")}
        >
          <option value="">Selecione um cargo</option>
          <option value="1">ADMIN</option>
        </select>
        <span className="text-red-400">{errors.role?.message}</span>
      </div>

      <button
        type="submit"
        className="mt-7 rounded-lg bg-primary w-full py-2 text-white"
      >
        {props.userId ? "Editar" : "Cadastrar"}
      </button>
    </form>
  );
}

UserForm.propType = {
  userId: PropTypes.string,
};
