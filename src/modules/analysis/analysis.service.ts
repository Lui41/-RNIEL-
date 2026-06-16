// src/modules/analysis/analysis.service.ts

import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { AnalysisRepository } from './repositories/analysis.repository';
import { CreateAnalysisDto } from './dto/create-analysis.dto';
import { UpdateAnalysisDto } from './dto/update-analysis.dto';

@Injectable()
export class AnalysisService {
  constructor(
    private readonly analysisRepository: AnalysisRepository,
  ) {}

  async create(
    dto: CreateAnalysisDto,
  ) {
    return this.analysisRepository.create({
      ...dto,
      status: 'DRAFT',
    });
  }

  async findAll() {
    return this.analysisRepository.findAll();
  }

  async findById(id: string) {
    const analysis =
      await this.analysisRepository.findById(id);

    if (!analysis) {
      throw new NotFoundException(
        'Analysis not found',
      );
    }

    return analysis;
  }

  async update(
    id: string,
    dto: UpdateAnalysisDto,
  ) {
    await this.findById(id);

    return this.analysisRepository.update(
      id,
      dto,
    );
  }

  async remove(id: string) {
    await this.findById(id);

    return this.analysisRepository.delete(id);
  }
}