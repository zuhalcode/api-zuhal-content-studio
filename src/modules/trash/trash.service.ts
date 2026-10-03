//#region-imports

import { supabase } from "../../libs/supabase";
import * as Yup from "yup";
import { translateDatabaseError } from "../../utils/errors";
import { TrashItem, TrashResource } from "./trash.types";
import { trashRegistry } from "./trash.registry";

//#endregion

export default {
  async findAll(): Promise<TrashItem[]> {
    const { data, error } = await supabase
      .from("trash_items")
      .select(`*`)
      .order("deleted_at", { ascending: false });

    if (error) {
      console.dir(error, { depth: null });
      const mapped = translateDatabaseError(error);
      throw new Yup.ValidationError(mapped.message);
    }

    return data as TrashItem[];
  },

  async restore(id: string, resource: TrashResource): Promise<void> {
    await trashRegistry[resource].restore(id);
  },

  async destroy(id: string, resource: TrashResource): Promise<void> {
    await trashRegistry[resource].destroy(id);
  },
};
