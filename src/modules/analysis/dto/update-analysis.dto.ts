// src/modules/analysis/dto/update-analysis.dto.ts

import {
  IsOptional,
  IsString,
} from 'class-validator';

export class UpdateAnalysisDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  objective?: string;

  @IsOptional()
  @IsString()
  analysisType?: string;

  @IsOptional()
  @IsString()
  status?: string;
}