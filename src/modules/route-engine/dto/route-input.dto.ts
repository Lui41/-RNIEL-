// src/modules/route-engine/dto/route-input.dto.ts

import {
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class RouteInputDto {
  @IsOptional()
  @IsString()
  objective?: string;

  @IsOptional()
  @IsString()
  opportunityType?: string;

  @IsOptional()
  @IsNumber()
  capital?: number;

  @IsOptional()
  @IsString()
  risk?: string;

  @IsOptional()
  @IsString()
  description?: string;
}