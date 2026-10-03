import { AssetTransactionEntity } from "../asset-transaction.entity";

export interface AssetTransactionResponseDTO extends AssetTransactionEntity {
  source_asset?: { name: string; unit: string };
  destination_asset?: { name: string; unit: string };
}
