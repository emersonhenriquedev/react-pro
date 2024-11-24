import * as yup from "yup";

const schema = yup.object().shape({
  email: yup.string().email("e-mail inválido").required("e-mail é obrigatório"),
  password: yup
    .string()
    .required("Senha é obrigatória")
    .min(4, "Mínimo 4 dígitos"),

});

export { schema };
