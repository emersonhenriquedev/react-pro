import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import PropTypes from "prop-types";
import httpClient from "../../../../../services/axios";

import { schema } from "./consts";
import { useNavigate } from "react-router-dom";

export default function UserForm(props) {
  const [roles, setRoles] = useState([]);
  const navigate = useNavigate();

  const {
    register,
    formState: { errors, isDirty, isSubmitting },
    handleSubmit,
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    const getRoles = async () => {
      const response = await httpClient.get("/roles");
      setRoles(response.data);
    };
    getRoles();
  }, []);

  useEffect(() => {
    if (!props.userId) return;
    const getUser = async () => {
      const response = await httpClient.get(`/users/${props.userId}`);
      const user = response.data;
      reset({
        name: user.name,
        email: user.email,
        role: user.role.id.toString(),
        password: "****",
      });
    };
    getUser();
  }, [props, reset]);

  async function onSubmit(data) {
    if (props.userId) {
      try {
        const body = {
          name: data.name,
          email: data.email,
          roleId: parseInt(data.role),
        };
        await httpClient.put(`/users/${props.userId}`, body);
        alert("Editado com sucesso");
      } catch (error) {
        alert("Error ao cadastrar novo usuário");
      }
    } else {
      const body = {
        name: data.name,
        email: data.email,
        password: data.password,
        roleId: parseInt(data.role),
      };

      try {
        await httpClient.post("/users", body);
        navigate("/dashboard");
      } catch (error) {
        alert("Error ao cadastrar novo usuário");
      }
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-3">
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

      {!props.userId && (
        <div className="flex flex-col gap-y-1">
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
      )}

      <div className="flex flex-col gap-y-1">
        <label htmlFor="role">Cargo</label>
        <select
          name="role"
          className="w-full px-3 py-2 border rounded-lg outline-none"
          {...register("role")}
        >
          <option value="">Selecione um cargo</option>
          {roles.map((r) => (
            <option key={r.id} value={r.id}>
              {r.name}
            </option>
          ))}
        </select>
        <span className="text-red-400">{errors.role?.message}</span>
      </div>

      <button
        type="submit"
        disabled={!isDirty || isSubmitting}
        className="w-full py-2 text-white rounded-lg mt-7 bg-primary disabled:bg-opacity-30 disabled:cursor-not-allowed"
      >
        {props.userId ? "Editar" : "Cadastrar"}
      </button>
    </form>
  );
}

UserForm.propType = {
  userId: PropTypes.string,
};
