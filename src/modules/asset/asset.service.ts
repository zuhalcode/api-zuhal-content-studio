//#region-imports

import * as Yup from "yup";
import { supabase } from "../../libs/supabase";
import { CreateAssetDTO } from "./dto/create-asset.dto";
import { AssetResponseDTO } from "./dto/asset-response.dto";
import { translateDatabaseError } from "../../utils/errors";
import { UpdateAssetDTO } from "./dto/update-asset.dto";
import { TABLES } from "../../constants/table.constant";

//#endregion

const table = TABLES.ASSETS;

export default {
  async findAll(): Promise<AssetResponseDTO[]> {
    const { data, error } = await supabase
      .from(table)
      .select(`*`)
      .is("deleted_at", null);

    if (error) throw error;

    return data as AssetResponseDTO[];
  },

  async findDeleted(): Promise<AssetResponseDTO[]> {
    const { data, error } = await supabase
      .from(table)
      .select(`*`)
      .not("deleted_at", "is", null);

    if (error) {
      console.dir(error, { depth: null });
      const mapped = translateDatabaseError(error);
      throw new Yup.ValidationError(mapped.message);
    }

    return data as AssetResponseDTO[];
  },

  async create(
    dto: CreateAssetDTO,
    userId?: string,
  ): Promise<AssetResponseDTO> {
    const { name, description, unit } = dto;

    const payload = {
      name: name.toLowerCase(),
      description: description?.toLowerCase(),
      unit: unit.toLowerCase(),

      created_by: userId,
    };

    const { data, error } = await supabase
      .from(table)
      .insert(payload)
      .select("*")
      .single();

    if (error) {
      console.dir(error, { depth: null });
      const mapped = translateDatabaseError(error);
      throw new Yup.ValidationError(mapped.message);
    }

    return data as AssetResponseDTO;
  },

  async update(
    dto: UpdateAssetDTO,
    userId: string,
    id: string,
  ): Promise<AssetResponseDTO> {
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
      .select("*")
      .single();

    if (error) {
      console.dir(error, { depth: null });
      const mapped = translateDatabaseError(error);
      throw new Yup.ValidationError(mapped.message);
    }

    return data as AssetResponseDTO;
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
