// src/modules/analysis/dto/analysis-response.dto.ts

export class AnalysisResponseDto {
  id: string;
  title?: string | null;
  objective?: string | null;
  analysisType?: string | null;
  status: string;
  userId: string;
  createdAt: Date;
}