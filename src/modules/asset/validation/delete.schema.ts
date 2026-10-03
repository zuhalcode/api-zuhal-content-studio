import * as Yup from "yup";

export const deleteAssetSchema = Yup.object({
  id: Yup.string().required("Id is required"),
});
