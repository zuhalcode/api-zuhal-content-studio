//#region-imports

import { supabase } from "../../libs/supabase";
import { TABLES } from "../../constants/table.constant";
import { ProjectRow } from "./project.types";

//#endregion

const table = TABLES.PROJECTS;

export default {
  async findAll(): Promise<ProjectRow[]> {
    const { data, error } = await supabase.from(table).select(`*`);

    if (error) throw error;

    return data;
  },
};
