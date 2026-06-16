// src/modules/companies/companies.controller.ts

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';

import { CompaniesService } from './companies.service';
import { CompanyMapper } from './mappers/company.mapper';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';

@Controller('companies')
export class CompaniesController {
  constructor(
    private readonly companiesService: CompaniesService,
  ) {}

  @Post()
  async create(
    @Body() dto: CreateCompanyDto,
  ) {
    const company =
      await this.companiesService.create(dto);

    return CompanyMapper.toResponse(company);
  }

  @Get()
  async findAll() {
    const companies =
      await this.companiesService.findAll();

    return CompanyMapper.toResponseList(companies);
  }

  @Get(':id')
  async findOne(
    @Param('id') id: string,
  ) {
    const company =
      await this.companiesService.findById(id);

    return CompanyMapper.toResponse(company);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateCompanyDto,
  ) {
    const company =
      await this.companiesService.update(id, dto);

    return CompanyMapper.toResponse(company);
  }

  @Delete(':id')
  async remove(
    @Param('id') id: string,
  ) {
    return this.companiesService.remove(id);
  }
}