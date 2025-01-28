import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import httpClient from "../../../../../services/axios";

import { schema } from "./consts";
import { useNavigate } from "react-router-dom";

export default function useUserFormViewModel(userId) {
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
    if (!userId) return;
    const getUser = async () => {
      const response = await httpClient.get(`/users/${userId}`);
      const user = response.data;
      reset({
        name: user.name,
        email: user.email,
        role: user.role.id.toString(),
        password: "****",
      });
    };
    getUser();
  }, [userId, reset]);

  async function onSubmit(data) {
    if (userId) {
      try {
        const body = {
          name: data.name,
          email: data.email,
          roleId: parseInt(data.role),
        };
        await httpClient.put(`/users/${userId}`, body);
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

  return {
    handleSubmit,
    onSubmit,
    register,
    errors,
    isDirty,
    isSubmitting,
    roles,
  };
}
