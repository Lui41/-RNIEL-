// src/modules/route-engine/dto/detect-route.dto.ts
import { IsNumber, IsOptional, IsString, Min } from 'class-validator';

export class DetectRouteDto {
  @IsOptional()
  @IsString()
  objective?: string;

  @IsOptional()
  @IsString()
  analysisType?: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  capital?: number;

  @IsOptional()
  @IsString()
  risk?: string;

  @IsOptional()
  @IsString()
  horizon?: string;

  @IsOptional()
  @IsString()
  notes?: string;
}