import { AuthResponseDto } from '../dto/auth-response.dto';

export class AuthMapper {
  static toAuthResponse(
    user: any,
    accessToken: string,
    refreshToken: string,
    expiresIn: number,
  ): AuthResponseDto {
    return {
      accessToken,
      refreshToken,
      expiresIn,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    };
  }
}