import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import type { Response as ExpressResponse } from 'express';
import { STATUS_CODES } from 'node:http';
import { Observable, map } from 'rxjs';
import { Response } from './response.model.js';

/** Wraps handler results in the `{ code, message, body }` envelope. */
@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, Response<T>> {
  intercept(
    ctx: ExecutionContext,
    next: CallHandler<T>,
  ): Observable<Response<T>> {
    const res = ctx.switchToHttp().getResponse<ExpressResponse>();
    return next.handle().pipe(
      map((body) => ({
        code: res.statusCode,
        message: STATUS_CODES[res.statusCode] ?? 'OK',
        body,
      })),
    );
  }
}
