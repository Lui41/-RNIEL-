// src/modules/users/dto/user-response.dto.ts

export class UserResponseDto {
  id: string;
  name: string;
  email: string;
  role: string;
  companyId?: string | null;
  createdAt: Date;
}