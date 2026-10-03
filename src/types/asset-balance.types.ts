interface AssetBalanceResponseDTO {
  id: string;
  name: string | null;
  description: string | null;
  unit: string | null;
  balance: number;
  has_transaction: boolean | null;
}

export type { AssetBalanceResponseDTO };
