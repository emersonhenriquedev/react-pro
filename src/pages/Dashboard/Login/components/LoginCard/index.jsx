import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "./consts";
import { useNavigate } from "react-router-dom";

export default function LoginCard() {
  const { register, handleSubmit, formState: {errors} } = useForm({
    resolver: yupResolver(schema),
  });

  const navigate = useNavigate();

  const onSubmit = (data) => {
    console.log(data);
    navigate('/dashboard');
    //TODO: Intregrar esse formulário
  };

  return (
    <div className="bg-white shadow-sm px-6 py-8 rounded-lg w-80">
      <form onSubmit={handleSubmit(onSubmit)}>
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
        <div className="flex flex-col gap-y-1 mt-4">
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
          className="mt-7 rounded-lg bg-blue-400 w-full py-2 text-white"
        >
          Entrar
        </button>
      </form>
    </div>
  );
}
