// src/modules/analysis/repositories/analysis.repository.ts

import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../shared/database/prisma.service';

@Injectable()
export class AnalysisRepository {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async create(data: any) {
    return this.prisma.analysis.create({
      data,
    });
  }

  async findAll() {
    return this.prisma.analysis.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findById(id: string) {
    return this.prisma.analysis.findUnique({
      where: { id },
    });
  }

  async update(
    id: string,
    data: any,
  ) {
    return this.prisma.analysis.update({
      where: { id },
      data,
    });
  }

  async delete(id: string) {
    return this.prisma.analysis.delete({
      where: { id },
    });
  }
}