import { ExecutionContext, Injectable } from '@nestjs/common';
import { SetMetadata } from '@nestjs/common';
import { KEYS } from 'common/constants/keys';
import { Request } from 'express';
import { ForbiddenError } from 'src/common/domain/errors/ForbiddenError';
import { JwtProvider } from 'src/shared/providers/jwt.provider/jwt.provider';


export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);

@Injectable()
export class JwtAuthGuard {
  constructor(private readonly jwtProvider: JwtProvider) {}

  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const token = this.getHeadersFromRequest(request);
    try {
      const payload = this.jwtProvider.verifyToken(token);
      request[KEYS.USER] = payload;
    } catch (error) {
      throw new ForbiddenError('Token not provide');
    }
    return true;
  }

  getHeadersFromRequest(request: Request): string {
    const [_, token] = request.headers?.authorization?.split(' ') ?? [];
    if (!token) {
      throw new ForbiddenError('Token not provide');
    }
    return token;
  }
}
