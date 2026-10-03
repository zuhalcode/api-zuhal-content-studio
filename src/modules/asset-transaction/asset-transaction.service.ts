//#region-imports

import * as Yup from "yup";
import { supabase } from "../../libs/supabase";
import { translateDatabaseError } from "../../utils/errors";
import { AssetTransactionResponseDTO } from "./dto/asset-transaction.response.dto";
import {
  CreateAssetTransactionPayloadDTO,
  CreateAssetTransactionRequestDTO,
} from "./dto/create-asset-transaction.dto";
import { UpdateAssetTransactionDTO } from "./dto/update-asset-transaction.dto";
import { TABLES } from "../../constants/table.constant";

//#endregion

const table = TABLES.ASSET_TRANSACTIONS;

export default {
  async findAll(): Promise<AssetTransactionResponseDTO[]> {
    const { data, error } = await supabase
      .from(table)
      .select(
        `*, 
        source_asset:assets!assets_transactions_source_asset_id_fkey(name,unit),
        destination_asset:assets!assets_transactions_destination_asset_id_fkey(name,unit)`,
      )
      .is("deleted_at", null)
      .is("deleted_by", null)
      .order("date", { ascending: false });

    if (error) {
      console.dir(error, { depth: null });
      const mapped = translateDatabaseError(error);
      throw new Yup.ValidationError(mapped.message);
    }

    return data as AssetTransactionResponseDTO[];
  },

  async findDeleted(): Promise<AssetTransactionResponseDTO[]> {
    const { data, error } = await supabase
      .from(table)
      .select(`*`)
      .not("deleted_at", "is", null)
      .order("date", { ascending: false });

    if (error) throw error;

    return data as AssetTransactionResponseDTO[];
  },

  async create(
    dto: CreateAssetTransactionRequestDTO,
    userId: string,
  ): Promise<AssetTransactionResponseDTO> {
    const {
      source_asset_id,
      source_quantity,
      destination_asset_id,
      destination_quantity,
      description,
      date,
    } = dto;

    const payload: CreateAssetTransactionPayloadDTO = {
      date,
      source_asset_id: source_asset_id ?? null,
      source_quantity: source_quantity || null,
      destination_asset_id: destination_asset_id ?? null,
      destination_quantity: destination_quantity || null,
      description: description?.trim() || null,
      created_by: userId,
    };

    const { data, error } = await supabase
      .from(table)
      .insert(payload)
      .select(
        `id, date, description, 
        source_asset_id, source_quantity, destination_quantity`,
      )
      .single();

    if (error) {
      console.dir(error, { depth: null });
      const mapped = translateDatabaseError(error);
      throw new Yup.ValidationError(mapped.message);
    }

    return data as AssetTransactionResponseDTO;
  },

  async update(
    dto: UpdateAssetTransactionDTO,
    userId: string,
    id: string,
  ): Promise<AssetTransactionResponseDTO> {
    const payload = {
      ...dto,
      updated_by: userId,
      updated_at: new Date().toISOString(),
    };

    Object.keys(payload).forEach((key) => {
      if (payload[key as keyof typeof payload] === undefined) {
        delete payload[key as keyof typeof payload];
      }
    });

    const { data, error } = await supabase
      .from(table)
      .update(payload)
      .eq("id", id)
      .select(
        `id, date, description, 
        source_asset_id, source_quantity, destination_quantity`,
      )
      .single();

    if (error) {
      console.dir(error, { depth: null });
      const mapped = translateDatabaseError(error);
      throw new Yup.ValidationError(mapped.message);
    }

    return data as AssetTransactionResponseDTO;
  },

  async restore(id: string): Promise<void> {
    const { error } = await supabase
      .from(table)
      .update({ deleted_at: null, deleted_by: null })
      .eq("id", id)
      .not("deleted_at", "is", null)
      .select("id")
      .single();

    if (error) {
      console.dir(error, { depth: null });
      const mapped = translateDatabaseError(error);
      throw new Yup.ValidationError(mapped.message);
    }
  },

  // Soft Delete
  async remove(id: string, userId: string): Promise<void> {
    const { error } = await supabase
      .from(table)
      .update({
        deleted_at: new Date().toISOString(),
        deleted_by: userId,
      })
      .eq("id", id)
      .is("deleted_at", null)
      .select("id")
      .single();

    if (error) {
      console.dir(error, { depth: null });
      const mapped = translateDatabaseError(error);
      throw new Yup.ValidationError(mapped.message);
    }
  },

  // Hard Delete
  async destroy(id: string): Promise<void> {
    const { error } = await supabase
      .from(table)
      .delete()
      .eq("id", id)
      .not("deleted_at", "is", null)
      .select("id")
      .single();

    if (error) {
      console.dir(error, { depth: null });
      const mapped = translateDatabaseError(error);
      throw new Yup.ValidationError(mapped.message);
    }
  },
};
