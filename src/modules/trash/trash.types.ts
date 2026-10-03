import { Database } from "../../types/database";

type TrashResource = "capital" | "product" | "asset" | "asset_transaction";
type TrashItem = Database["public"]["Views"]["trash_items"]["Row"];

type TrashHandler = {
  restore(id: string): Promise<void>;
  destroy(id: string): Promise<void>;
};

export type { TrashResource, TrashItem, TrashHandler };
