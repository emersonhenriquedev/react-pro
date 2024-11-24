import * as yup from "yup";

const schema = yup.object({
  name: yup
    .string()
    .required("Nome é obrigatório")
    .min(3, "Mínimo 3 caracteres"),
  price: yup.string().required("Preço é obrigatório"),
  category: yup.string().required("Categoria é obrigatória"),
  stock: yup.string(),
});

export { schema };
