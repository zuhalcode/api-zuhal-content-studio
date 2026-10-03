import * as Yup from "yup";

export const restoreTrashSchema = Yup.object({
  id: Yup.string().required("Id is required"),
  resource: Yup.string().required("Resource is required"),
});
