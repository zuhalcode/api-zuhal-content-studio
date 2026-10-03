import * as Yup from "yup";
import { UpdateAssetTransactionDTO } from "../dto/update-asset-transaction.dto";

export const updateAssetTransactionSchema: Yup.ObjectSchema<UpdateAssetTransactionDTO> =
  Yup.object({
    date: Yup.string(),

    description: Yup.string().nullable(),

    source_asset_id: Yup.string().nullable(),
    source_quantity: Yup.number().nullable(),

    destination_asset_id: Yup.string().nullable(),
    destination_quantity: Yup.number().nullable(),
  }).test(
    "at-least-one-field",
    "At least one field must be provided",
    (value) => !!value && Object.keys(value).length > 0,
  );
