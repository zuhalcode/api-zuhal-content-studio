//#region-imports

import { supabase } from "../../libs/supabase";
import { TABLES } from "../../constants/table.constant";
import { IdeaRow } from "./idea.types";
import { CreateIdeaDTO } from "./idea.schema";

//#endregion

const table = TABLES.IDEAS;

export default {
  async findAll(): Promise<IdeaRow[]> {
    const { data, error } = await supabase.from(table).select(`*`);

    if (error) throw error;

    return data;
  },

  async create(dto: CreateIdeaDTO): Promise<IdeaRow> {
    const { data, error } = await supabase
      .from(table)
      .insert(dto)
      .select()
      .single();

    if (error) {
      throw error;
    }

    return data;
  },
};
