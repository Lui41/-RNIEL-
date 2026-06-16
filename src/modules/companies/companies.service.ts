// src/modules/companies/companies.service.ts

import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { CompanyRepository } from './repositories/company.repository';

@Injectable()
export class CompaniesService {
  constructor(
    private readonly companyRepository: CompanyRepository,
  ) {}

  async create(dto: CreateCompanyDto) {
    return this.companyRepository.create(dto);
  }

  async findAll() {
    return this.companyRepository.findAll();
  }

  async findById(id: string) {
    const company = await this.companyRepository.findById(id);

    if (!company) {
      throw new NotFoundException('Company not found');
    }

    return company;
  }

  async update(
    id: string,
    dto: UpdateCompanyDto,
  ) {
    await this.findById(id);

    return this.companyRepository.update(id, dto);
  }

  async remove(id: string) {
    await this.findById(id);

    return this.companyRepository.delete(id);
  }
}