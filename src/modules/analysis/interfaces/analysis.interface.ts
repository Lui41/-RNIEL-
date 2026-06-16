// src/modules/analysis/interfaces/analysis.interface.ts

export interface Analysis {
  id: string;
  title?: string | null;
  objective?: string | null;
  analysisType?: string | null;
  status: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}