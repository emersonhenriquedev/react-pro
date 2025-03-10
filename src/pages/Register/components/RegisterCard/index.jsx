import { useForm } from "react-hook-form";
import { schema } from "./consts";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { AuthService } from "../../../../services/auth";

export default function RegisterCard() {
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
      const body = {
        name: data.name,
        email: data.email,
        password: data.password,
      };

      await AuthService.register(body);
      const response = await AuthService.login(body);
      localStorage.setItem("token", response.data.token);
      navigate("/");
    } catch (error) {
      console.error(error);
      if (error.response.data.statusCode === 409) {
        alert("E-mail já cadastrado");
      } else {
        alert("Ocorreu um erro");
      }
    }
  }

  return (
    <div className="p-8 bg-white rounded-lg w-96">
      <h1 className="text-3xl text-center">Registre-se</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col mt-4 gap-y-1"
      >
        <div className="flex flex-col gap-y-1">
          <label htmlFor="email">Nome</label>
          <input
            name="name"
            type="text"
            className="w-full px-3 py-1 border rounded-lg outline-none"
            placeholder="Nome"
            {...register("name")}
          />
          <span className="text-red-400">{errors.email?.message}</span>
        </div>
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
        <div className="flex flex-col gap-y-1 ">
          <label htmlFor="password">Confirmar senha</label>
          <input
            name="password"
            type="password"
            className="w-full px-3 py-1 border rounded-lg outline-none"
            placeholder="Confirmação"
            {...register("confirmPassword")}
          />
          <span className="text-red-400">
            {errors.confirmPassword?.message}
          </span>
        </div>
        <button
          type="submit"
          className="w-full py-2 mt-2 text-white rounded-lg bg-primary"
        >
          Cadastrar
        </button>
        <Link to="/login" className="mt-2 text-center text-blue-400">
          Já tenho conta
        </Link>
      </form>
    </div>
  );
}
