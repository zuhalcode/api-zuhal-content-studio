interface CapitalEntity {
  id: string;

  date: string;

  capital: number | null;
  purchase: number | null;
  sell: number | null;

  created_at: string;
  created_by: string;

  updated_at: string | null;
  updated_by: string | null;

  deleted_at: string | null;
  deleted_by: string | null;
}

export type { CapitalEntity };
