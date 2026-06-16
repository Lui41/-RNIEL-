// src/modules/companies/interfaces/company.interface.ts

export interface Company {
  id: string;
  name: string;
  description?: string | null;
  createdAt: Date;
  updatedAt: Date;
}