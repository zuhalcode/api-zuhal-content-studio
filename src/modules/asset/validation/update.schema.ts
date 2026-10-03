import * as Yup from "yup";

import { UpdateAssetDTO } from "../dto/update-asset.dto";

export const updateAssetSchema: Yup.ObjectSchema<UpdateAssetDTO> = Yup.object({
  name: Yup.string().optional(),
  description: Yup.string().optional(),
  unit: Yup.string().optional(),
}).test(
  "at-least-one-field",
  "At least one field must be provided",
  (value) => value != null && Object.keys(value).length > 0,
);
