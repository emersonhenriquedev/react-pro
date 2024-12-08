import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "./consts";
import { useNavigate } from "react-router-dom";
import httpClient from "../../../../../services/axios";
import { useState, useContext } from "react";
import { authContext } from "../../../../../contexts/authContext";

export default function LoginCard() {
  const { login } = useContext(authContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [error, setError] = useState("");

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    const body = {
      email: data.email,
      password: data.password,
    };

    try {
      // const response = await httpClient.post("/auth/login", body);
      // const token = response.data.token;
      // localStorage.setItem("token", token);
      // const userResponse = await httpClient.get("/users/me", {
      //   headers: { Authorization: `Bearer ${token}` },
      // });
      
      // if (userResponse.data.role.name === "ADMIN") {
      //   navigate("/dashboard");
      // }
      await login(body);
      navigate("/dashboard");
    } catch (error) {
      if (error.status === 401) {
        setError("E-mail ou senha incorretos");
      }
    }
  };

  return (
    <div className="px-6 py-8 bg-white rounded-lg shadow-sm w-80">
      <form onSubmit={handleSubmit(onSubmit)}>
        <span className="inline-block mb-4 font-medium text-red-400">
          {error}
        </span>
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
        <div className="flex flex-col mt-4 gap-y-1">
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
          className="w-full py-2 text-white bg-blue-400 rounded-lg mt-7"
        >
          Entrar
        </button>
      </form>
    </div>
  );
}
