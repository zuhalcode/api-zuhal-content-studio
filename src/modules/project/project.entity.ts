interface AssetEntity {
  id: string;
  name: string;
  description: string | null;
  unit: string;

  created_at: string;
  created_by: string;

  updated_at: string | null;
  updated_by: string | null;

  deleted_at: string | null;
  deleted_by: string | null;
}

export type { AssetEntity };
