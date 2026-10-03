import * as Yup from "yup";

export const deleteAssetTransactionSchema = Yup.object({
  id: Yup.string().required("Id is required"),
});
