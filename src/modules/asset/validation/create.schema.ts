import * as Yup from "yup";
import { CreateAssetDTO } from "../dto/create-asset.dto";

export const createAssetSchema: Yup.ObjectSchema<CreateAssetDTO> = Yup.object({
  name: Yup.string().nullable().required(),
  description: Yup.string().nullable().required(),
  unit: Yup.string().nullable().required(),
});
