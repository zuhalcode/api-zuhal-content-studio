interface CreateCapitalRequestDTO {
  date: string;
  capital: number | null;
  purchase: number | null;
  sell: number | null;
}

interface CreateCapitalPayloadDTO extends CreateCapitalRequestDTO {
  created_by: string;
}

export type { CreateCapitalRequestDTO, CreateCapitalPayloadDTO };
