interface CreateAssetTransactionRequestDTO {
  date: string;
  description: string | null;

  source_asset_id?: string | null;
  source_quantity: number | null;

  destination_asset_id: string | null;
  destination_quantity: number | null;
}

interface CreateAssetTransactionPayloadDTO extends CreateAssetTransactionRequestDTO {
  created_by: string;
}

export type {
  CreateAssetTransactionPayloadDTO,
  CreateAssetTransactionRequestDTO,
};
