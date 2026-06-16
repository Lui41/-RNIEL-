// src/modules/analysis/dto/create-analysis.dto.ts

import {
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateAnalysisDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  objective?: string;

  @IsOptional()
  @IsString()
  analysisType?: string;

  @IsString()
  userId: string;
}