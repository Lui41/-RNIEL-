// src/modules/route-engine/interfaces/route-result.interface.ts

import { RouteType } from '../enums/route.enum';

export interface RouteResult {
  route: RouteType;
  confidence: number;
  reasons: string[];
}