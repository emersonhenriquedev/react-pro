import * as yup from "yup";

const schema = yup.object().shape({
  email: yup.string().email("e-mail inválido").required("e-mail é obrigatório"),
  name: yup.string().required("Mínimo 3 caracteres"),
  password: yup
    .string()
    .required("Senha é obrigatória")
    .min(4, "Mínimo 4 dígitos"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "As senhas não conferem")
    .required("Campo obrigatório"),
});

export { schema };
