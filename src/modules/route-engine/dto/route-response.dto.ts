// src/modules/route-engine/dto/route-response.dto.ts
import { AnalysisRoute } from '../enums/analysis-route.enum';

export class RouteResponseDto {
  route: AnalysisRoute;
  confidence: number;
  matchedSignals: string[];
  reasons: string[];
  scores: Record<string, number>;
}