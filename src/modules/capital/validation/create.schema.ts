import * as Yup from "yup";
import { CreateCapitalRequestDTO } from "../dto/create.dto";

export const createCapitalSchema: Yup.ObjectSchema<CreateCapitalRequestDTO> =
  Yup.object({
    date: Yup.string().required(),
    capital: Yup.number().nullable().required(),
    purchase: Yup.number().nullable().required(),
    sell: Yup.number().nullable().required(),
  });
