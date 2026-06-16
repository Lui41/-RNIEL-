// src/modules/route-engine/services/route-classifier.service.ts

import { Injectable } from '@nestjs/common';

import { RouteType } from '../enums/route.enum';
import { RouteResult } from '../interfaces/route-result.interface';
import { ROUTE_KEYWORDS } from '../constants/route-keywords.constants';

@Injectable()
export class RouteClassifierService {
  classify(payload: any): RouteResult {
    const text = JSON.stringify(payload).toLowerCase();

    let bestRoute = RouteType.IDEA_NEGOCIO;
    let bestScore = 0;

    const reasons: string[] = [];

    for (const route of Object.values(RouteType)) {
      const keywords = ROUTE_KEYWORDS[route];

      let score = 0;

      for (const keyword of keywords) {
        if (text.includes(keyword.toLowerCase())) {
          score++;
        }
      }

      if (score > bestScore) {
        bestScore = score;
        bestRoute = route;
      }
    }

    reasons.push(
      `Detected ${bestScore} matching keywords`,
    );

    return {
      route: bestRoute,
      confidence:
        bestScore === 0
          ? 0.5
          : Math.min(
              0.6 + bestScore * 0.08,
              0.95,
            ),
      reasons,
    };
  }
}