import { AssetEntity } from "../asset.entity";

type AssetDetailResponseDTO = AssetEntity & { hasTransactions: boolean };

type AssetResponseDTO = Pick<
  AssetEntity,
  "id" | "name" | "unit" | "description"
> & { has_transactions?: boolean };

export type { AssetResponseDTO, AssetDetailResponseDTO };
