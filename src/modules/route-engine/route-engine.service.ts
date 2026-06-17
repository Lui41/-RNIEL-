// src/modules/route-engine/route-engine.service.ts
import { Injectable } from '@nestjs/common';
import { DetectRouteDto } from './dto/detect-route.dto';
import { RouteResponseDto } from './dto/route-response.dto';
import { AnalysisRoute } from './enums/analysis-route.enum';
import {
  ROUTE_CONFIDENCE_MAX,
  ROUTE_CONFIDENCE_MIN,
  ROUTE_KEYWORDS,
} from './constants/route-engine.constants';

type RouteScoreMap = Record<AnalysisRoute, number>;

@Injectable()
export class RouteEngineService {
  detectRoute(dto: DetectRouteDto): RouteResponseDto {
    const objective = this.normalizeText(
      [dto.objective, dto.analysisType, dto.notes].filter(Boolean).join(' '),
    );

    const scores = this.scoreRoutes(objective, dto);
    const ranked = Object.entries(scores).sort((a, b) => b[1] - a[1]);

    const [bestRouteRaw, bestScore] = ranked[0];
    const [, secondScore] = ranked[1] ?? [null, 0];

    const route = bestScore > 0
      ? (bestRouteRaw as AnalysisRoute)
      : AnalysisRoute.IDEA_NEGOCIO;

    const confidence = this.computeConfidence(bestScore, secondScore, dto);

    return {
      route,
      confidence,
      matchedSignals: this.getMatchedSignals(route, objective),
      reasons: this.buildReasons(route, objective, dto, bestScore),
      scores: Object.fromEntries(
        Object.entries(scores).map(([key, value]) => [key, value]),
      ),
    };
  }

  getAvailableRoutes(): AnalysisRoute[] {
    return Object.values(AnalysisRoute);
  }

  private scoreRoutes(objective: string, dto: DetectRouteDto): RouteScoreMap {
    const scores = {} as RouteScoreMap;

    for (const route of Object.values(AnalysisRoute)) {
      scores[route] = 0;
    }

    for (const route of Object.values(AnalysisRoute)) {
      const keywords = ROUTE_KEYWORDS[route];
      for (const keyword of keywords) {
        if (objective.includes(this.normalizeText(keyword))) {
          scores[route] += 2;
        }
      }
    }

    const capital = dto.capital ?? 0;
    const risk = this.normalizeText(dto.risk ?? '');
    const horizon = this.normalizeText(dto.horizon ?? '');

    if (capital > 0) {
      scores[AnalysisRoute.INVERSION] += 1;
      if (capital >= 10000) scores[AnalysisRoute.INVERSION] += 1;
    }

    if (risk.includes('alto')) scores[AnalysisRoute.INVERSION] += 1;
    if (risk.includes('medio')) scores[AnalysisRoute.INVERSION] += 1;

    if (horizon.includes('largo')) {
      scores[AnalysisRoute.INVERSION] += 1;
      scores[AnalysisRoute.EXPANSION] += 1;
    }

    if (objective.includes('caja') || objective.includes('ventas')) {
      scores[AnalysisRoute.NEGOCIO_EXISTENTE] += 2;
    }

    if (objective.includes('usuarios') || objective.includes('tráfico') || objective.includes('trafico')) {
      scores[AnalysisRoute.ACTIVO_DIGITAL] += 2;
    }

    if (objective.includes('validar') || objective.includes('validacion') || objective.includes('validación')) {
      scores[AnalysisRoute.IDEA_NEGOCIO] += 2;
    }

    if (objective.includes('comprar') || objective.includes('adquirir') || objective.includes('due diligence')) {
      scores[AnalysisRoute.COMPRA_EMPRESA] += 2;
    }

    if (objective.includes('franquicia') || objective.includes('canon') || objective.includes('royalty')) {
      scores[AnalysisRoute.FRANQUICIA] += 2;
    }

    if (objective.includes('expandir') || objective.includes('escalar') || objective.includes('sucursal')) {
      scores[AnalysisRoute.EXPANSION] += 2;
    }

    if (objective.includes('comparar') || objective.includes('opciones') || objective.includes('alternativas')) {
      scores[AnalysisRoute.COMPARACION] += 2;
    }

    return scores;
  }

  private computeConfidence(bestScore: number, secondScore: number, dto: DetectRouteDto): number {
    const totalSignal = bestScore + secondScore;

    let confidence =
      bestScore <= 0
        ? ROUTE_CONFIDENCE_MIN
        : Math.max(ROUTE_CONFIDENCE_MIN, Math.min(ROUTE_CONFIDENCE_MAX, bestScore / Math.max(2, totalSignal)));

    if ((dto.objective ?? '').trim().length > 0) confidence += 0.03;
    if (dto.capital !== undefined) confidence += 0.02;
    if ((dto.risk ?? '').trim().length > 0) confidence += 0.01;

    return Number(Math.min(ROUTE_CONFIDENCE_MAX, confidence).toFixed(2));
  }

  private buildReasons(
    route: AnalysisRoute,
    objective: string,
    dto: DetectRouteDto,
    score: number,
  ): string[] {
    const reasons: string[] = [];

    if (score <= 0) {
      reasons.push('No hubo señales suficientes; se aplicó ruta base.');
      return reasons;
    }

    reasons.push(`La clasificación favorece ${route}.`);

    if (route === AnalysisRoute.INVERSION && dto.capital !== undefined) {
      reasons.push(`Se detectó capital disponible: ${dto.capital}.`);
    }

    if (objective.includes('validar') || objective.includes('validacion') || objective.includes('validación')) {
      reasons.push('La intención de validación favorece IDEA_NEGOCIO.');
    }

    if (objective.includes('caja') || objective.includes('ventas')) {
      reasons.push('Las referencias a operación real favorecen NEGOCIO_EXISTENTE.');
    }

    if (objective.includes('usuarios') || objective.includes('tráfico') || objective.includes('trafico')) {
      reasons.push('Las referencias a tracción digital favorecen ACTIVO_DIGITAL.');
    }

    return reasons;
  }

  private getMatchedSignals(route: AnalysisRoute, objective: string): string[] {
    return ROUTE_KEYWORDS[route].filter((keyword) =>
      objective.includes(this.normalizeText(keyword)),
    );
  }

  private normalizeText(value: string): string {
    return value
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .trim();
  }
}