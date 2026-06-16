// src/modules/route-engine/dto/route-response.dto.ts

export class RouteResponseDto {
  route: string;
  confidence: number;
  reasons: string[];
}