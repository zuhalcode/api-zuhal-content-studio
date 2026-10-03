interface AssetTransactionEntity {
  id: string;
  date: string;
  description: string | null;

  source_asset_id: string | null;
  source_quantity: number | null;

  destination_asset_id: string | null;
  destination_quantity: number | null;

  created_at: string;
  created_by: string;

  updated_at: string | null;
  updated_by: string | null;

  deleted_at: string | null;
  deleted_by: string | null;
}

export type { AssetTransactionEntity };
