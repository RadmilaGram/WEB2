import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';

@Injectable()
export class ApiKeyGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const method = request.method;

    if (['POST', 'PUT', 'PATCH', 'DELETE'].includes(method)) {
      const apiKey = request.headers['x-api-key'];
      const validApiKey = process.env.API_KEY;

      if (!apiKey || apiKey !== validApiKey) {
        throw new UnauthorizedException('Invalid or missing API key');
      }
    }

    return true;
  }
}
