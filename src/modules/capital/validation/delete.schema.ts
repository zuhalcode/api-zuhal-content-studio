import * as Yup from "yup";

export const deleteCapitalSchema = Yup.object({
  id: Yup.string().required("Id is required"),
});
