//#region-imports

import * as Yup from "yup";
import {
  CreateCapitalPayloadDTO,
  CreateCapitalRequestDTO,
} from "./dto/create.dto";

import { supabase } from "../../libs/supabase";
import { translateDatabaseError } from "../../utils/errors";

import { UpdateCapitalDTO } from "./dto/update.dto";
import { CapitalResponseDTO } from "./dto/response.dto";
import { TABLES } from "../../constants/table.constant";

//#endregion

const table = TABLES.CAPITALS;

export default {
  async findAll(year?: string, month?: string): Promise<CapitalResponseDTO[]> {
    let query = supabase.from(table).select("*").is("deleted_at", null);

    // Filter Year & Month
    if (year && month) {
      const paddedMonth = String(month).padStart(2, "0");
      const startDate = `${year}-${paddedMonth}-01`;
      const nextMonth = new Date(Number(year), Number(month), 1);
      const endDate = nextMonth.toISOString().split("T")[0];

      query = query.gte("date", startDate).lt("date", endDate);
    }

    query = query.order("date", {
      ascending: false,
    });

    const { data, error } = await query;

    if (error) throw error;

    return data as CapitalResponseDTO[];
  },

  async findDeleted(): Promise<CapitalResponseDTO[]> {
    let query = supabase.from(table).select("*").not("deleted_at", "is", null);

    query = query.order("date", {
      ascending: false,
    });

    const { data, error } = await query;

    if (error) throw error;

    return data as CapitalResponseDTO[];
  },

  async create(
    dto: CreateCapitalRequestDTO,
    userId: string,
  ): Promise<CapitalResponseDTO> {
    const payload: CreateCapitalPayloadDTO = {
      ...dto,
      created_by: userId,
    };

    const { data, error } = await supabase
      .from(table)
      .insert(payload)
      .select()
      .single();

    if (error) {
      console.dir(error, { depth: null });
      const mapped = translateDatabaseError(error);
      throw new Yup.ValidationError(mapped.message);
    }

    return data as CapitalResponseDTO;
  },

  async update(
    dto: UpdateCapitalDTO,
    userId: string,
    id: string,
  ): Promise<CapitalResponseDTO> {
    const payload = {
      ...dto,
      updated_by: userId,
      updated_at: new Date().toISOString(),
    };

    const { data, error } = await supabase
      .from(table)
      .update(payload)
      .eq("id", id)
      .select(`*`)
      .single();

    if (error) {
      console.dir(error, { depth: null });
      const mapped = translateDatabaseError(error);
      throw new Yup.ValidationError(mapped.message);
    }

    return data as CapitalResponseDTO;
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
