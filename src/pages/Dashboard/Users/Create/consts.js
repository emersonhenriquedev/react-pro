import * as yup from "yup";

const schema = yup.object.shape({
  name: yup
    .string()
    .required("Nome é obrigatório")
    .min(3, "Nome deve ter no mínimo 3 caracteres"),
    email: yup.string.email("E-mail inválido").required('E-mail é obrigatório'),
    password: yup.string().required('Senha é obrigatória').min('Senha tem que ter no mínimo 4 dígitos'),
    role: yup.number,
});

export { schema };
