import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { schema } from "./consts";
import { yupResolver } from "@hookform/resolvers/yup";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { authContext } from "../../../contexts/authContext";

export default function LoginCard() {
  const { login } = useContext(authContext);
  const navigate = useNavigate();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(schema),
  });

  async function onSubmit(data) {
    try {
      await login(data);
      navigate('/');
    } catch (error) {
      console.error(error);
      alert("Ocorreu um erro");
    }
  }

  return (
    <div className="p-8 bg-white rounded-lg w-96">
      <h1 className="text-3xl text-center">Entrar</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col mt-4 gap-y-1"
      >
        <div className="flex flex-col gap-y-1">
          <label htmlFor="email">Email</label>
          <input
            name="email"
            type="email"
            className="w-full px-3 py-1 border rounded-lg outline-none"
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
            className="w-full px-3 py-1 border rounded-lg outline-none"
            placeholder="Senha"
            {...register("password")}
          />
          <span className="text-red-400">{errors.password?.message}</span>
        </div>
        <button
          type="submit"
          className="w-full py-2 mt-2 text-white rounded-lg bg-primary"
        >
          Entrar
        </button>
        <Link to="/register" className="mt-2 text-center text-blue-400">
          Não tenho conta
        </Link>
      </form>
    </div>
  );
}
