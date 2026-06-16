// src/modules/companies/dto/company-response.dto.ts

export class CompanyResponseDto {
  id: string;
  name: string;
  description?: string | null;
  createdAt: Date;
}