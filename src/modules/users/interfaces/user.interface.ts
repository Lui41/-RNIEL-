// src/modules/users/interfaces/user.interface.ts

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  role: string;
  companyId?: string | null;
  createdAt: Date;
  updatedAt: Date;
}