import * as yup from "yup";

export const schema = yup.object({
  name: yup
    .string()
    .required("Campo obrigatório")
    .min(3, "Mínimo 3 caracteres"),
});
