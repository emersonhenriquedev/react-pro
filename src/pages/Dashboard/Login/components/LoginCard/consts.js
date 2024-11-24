import * as yup from "yup";

const schema = yup.object().shape({
  email: yup
    .string()
    .email("e-mail é inválido")
    .required("e-mail é obrigatório"),
  password: yup.string().required(),
});

export { schema };
