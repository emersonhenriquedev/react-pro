import * as yup from "yup";

export const schema = yup.object({
  search: yup.string().required(),
});
