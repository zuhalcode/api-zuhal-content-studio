import { AssetEntity } from "../asset.entity";

type CreateAssetDTO = Omit<
  AssetEntity,
  | "id"
  | "created_at"
  | "created_by"
  | "updated_at"
  | "updated_by"
  | "deleted_at"
  | "deleted_by"
>;

export type { CreateAssetDTO };
