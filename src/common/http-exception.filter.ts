import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import type { Response as ExpressResponse } from 'express';
import { ResponseWithoutBody } from './response.model.js';

/** Renders every error as a `{ code, message }` body. */
@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(HttpExceptionFilter.name);

  catch(exception: unknown, host: ArgumentsHost) {
    const res = host.switchToHttp().getResponse<ExpressResponse>();
    let payload: ResponseWithoutBody;

    if (exception instanceof HttpException) {
      const response = exception.getResponse();
      const message =
        typeof response === 'string'
          ? response
          : (response as { message?: string | string[] }).message;
      payload = {
        code: exception.getStatus(),
        message: Array.isArray(message)
          ? message.join(', ')
          : (message ?? exception.message),
      };
    } else {
      this.logger.error(exception);
      payload = {
        code: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Internal Server Error',
      };
    }

    res.status(payload.code).json(payload);
  }
}
