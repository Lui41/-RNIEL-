// src/modules/analysis/analysis.controller.ts

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';

import { AnalysisService } from './analysis.service';
import { AnalysisMapper } from './mappers/analysis.mapper';
import { CreateAnalysisDto } from './dto/create-analysis.dto';
import { UpdateAnalysisDto } from './dto/update-analysis.dto';

@Controller('analysis')
export class AnalysisController {
  constructor(
    private readonly analysisService: AnalysisService,
  ) {}

  @Post()
  async create(
    @Body() dto: CreateAnalysisDto,
  ) {
    const analysis =
      await this.analysisService.create(dto);

    return AnalysisMapper.toResponse(
      analysis,
    );
  }

  @Get()
  async findAll() {
    const analyses =
      await this.analysisService.findAll();

    return AnalysisMapper.toResponseList(
      analyses,
    );
  }

  @Get(':id')
  async findOne(
    @Param('id') id: string,
  ) {
    const analysis =
      await this.analysisService.findById(id);

    return AnalysisMapper.toResponse(
      analysis,
    );
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateAnalysisDto,
  ) {
    const analysis =
      await this.analysisService.update(
        id,
        dto,
      );

    return AnalysisMapper.toResponse(
      analysis,
    );
  }

  @Delete(':id')
  async remove(
    @Param('id') id: string,
  ) {
    return this.analysisService.remove(id);
  }
}