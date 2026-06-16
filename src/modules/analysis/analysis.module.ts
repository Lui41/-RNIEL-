// src/modules/analysis/analysis.module.ts

import { Module } from '@nestjs/common';

import { AnalysisController } from './analysis.controller';
import { AnalysisService } from './analysis.service';
import { AnalysisRepository } from './repositories/analysis.repository';

@Module({
  controllers: [AnalysisController],
  providers: [
    AnalysisService,
    AnalysisRepository,
  ],
  exports: [
    AnalysisService,
    AnalysisRepository,
  ],
})
export class AnalysisModule {}