// src/modules/analysis/mappers/analysis.mapper.ts

import { AnalysisResponseDto } from '../dto/analysis-response.dto';

export class AnalysisMapper {
  static toResponse(
    analysis: any,
  ): AnalysisResponseDto {
    return {
      id: analysis.id,
      title: analysis.title,
      objective: analysis.objective,
      analysisType: analysis.analysisType,
      status: analysis.status,
      userId: analysis.userId,
      createdAt: analysis.createdAt,
    };
  }

  static toResponseList(
    analyses: any[],
  ): AnalysisResponseDto[] {
    return analyses.map((analysis) =>
      this.toResponse(analysis),
    );
  }
}