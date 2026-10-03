import * as Yup from "yup";
import { CreateAssetTransactionRequestDTO } from "../dto/create-asset-transaction.dto";

export const createAssetTransactionSchema: Yup.ObjectSchema<CreateAssetTransactionRequestDTO> =
  Yup.object({
    date: Yup.string().required(),

    description: Yup.string().nullable().required(),

    source_asset_id: Yup.string().nullable(),
    source_quantity: Yup.number().nullable().required(),

    destination_asset_id: Yup.string().nullable().required(),
    destination_quantity: Yup.number().nullable().required(),
  });
