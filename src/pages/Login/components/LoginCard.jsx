import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { schema } from "./consts";
import { yupResolver } from "@hookform/resolvers/yup";

export default function LoginCard() {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(schema),
  });

  function onSubmit(data) {
    console.log(data);
    //TODO: fazer integração
  }

  return (
    <div className="bg-white p-8 rounded-lg w-96">
      <h1 className="text-3xl text-center">Entrar</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-4 flex flex-col gap-y-1"
      >
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
        <div className="flex flex-col gap-y-1 ">
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
        <button
          type="submit"
          className="mt-2 rounded-lg bg-primary w-full py-2 text-white"
        >
          Entrar
        </button>
        <Link to="/register" className="text-center mt-2 text-blue-400">
          Não tenho conta
        </Link>
      </form>
    </div>
  );
}
