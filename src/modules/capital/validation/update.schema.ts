import * as Yup from "yup";
import { UpdateCapitalDTO } from "../dto/update.dto";

export const updateCapitalSchema: Yup.ObjectSchema<UpdateCapitalDTO> =
  Yup.object({
    date: Yup.string(),
    capital: Yup.number().nullable(),
    purchase: Yup.number().nullable(),
    sell: Yup.number().nullable(),
  });
