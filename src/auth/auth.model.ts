import { ApiProperty } from '@nestjs/swagger';
import type { DecodedIdToken } from 'firebase-admin/auth';

export class AuthSignInResponse {
  @ApiProperty({ description: 'Firebase ID token, use as Bearer token' })
  idToken: string;

  @ApiProperty()
  refreshToken: string;

  @ApiProperty({ description: 'Seconds until idToken expires', example: 3600 })
  expiresIn: number;
}

export class AuthMeResponse {
  @ApiProperty({ description: 'Firebase UID' })
  uid: string;

  @ApiProperty({
    description: 'Decoded ID token claims, including custom claims',
    type: 'object',
    additionalProperties: true,
  })
  claims: DecodedIdToken;
}
