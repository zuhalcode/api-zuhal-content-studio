import * as Yup from "yup";
import { supabase } from "../libs/supabase";
import { translateDatabaseError } from "../utils/errors";
import { AssetBalanceResponseDTO } from "../types/asset-balance.types";

export default {
  async findAll(): Promise<AssetBalanceResponseDTO[]> {
    const { data, error } = await supabase.from("asset_balances").select("*");

    if (error) {
      console.dir(error, { depth: null });

      const mapped = translateDatabaseError(error);

      throw new Yup.ValidationError(mapped.message);
    }

    return data.map((item) => {
      if (item.value === null) {
        throw new Error("Asset balance value cannot be null");
      }

      return {
        id: String(item.id),
        name: item.name,
        description: item.description,
        unit: item.unit,
        balance: item.value,
        has_transaction: item.has_transaction,
      };
    });
  },
};
