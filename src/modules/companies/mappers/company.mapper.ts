// src/modules/companies/mappers/company.mapper.ts

import { CompanyResponseDto } from '../dto/company-response.dto';

export class CompanyMapper {
  static toResponse(company: any): CompanyResponseDto {
    return {
      id: company.id,
      name: company.name,
      description: company.description,
      createdAt: company.createdAt,
    };
  }

  static toResponseList(companies: any[]): CompanyResponseDto[] {
    return companies.map((company) => this.toResponse(company));
  }
}