// src/modules/users/mappers/user.mapper.ts

import { UserResponseDto } from '../dto/user-response.dto';

export class UserMapper {
  static toResponse(user: any): UserResponseDto {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      companyId: user.companyId,
      createdAt: user.createdAt,
    };
  }

  static toResponseList(users: any[]): UserResponseDto[] {
    return users.map((user) => this.toResponse(user));
  }
}