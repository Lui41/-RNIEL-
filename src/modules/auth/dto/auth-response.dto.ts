export class AuthResponseDto {
  accessToken: string;

  refreshToken: string;

  expiresIn: number;

  user: {
    id: string;
    name: string;
    email: string;
    role: string;
  };
}