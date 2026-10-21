import { applyDecorators, Type } from '@nestjs/common';
import {
  ApiExtraModels,
  ApiOkResponse,
  ApiResponse,
  getSchemaPath,
} from '@nestjs/swagger';
import { Response, ResponseWithoutBody } from './response.model.js';

/** Documents a 200 response as `Response` with `body` set to `model`. */
export const ApiOkResponseOf = (model: Type) =>
  applyDecorators(
    ApiExtraModels(Response, model),
    ApiOkResponse({
      description: 'OK',
      schema: {
        allOf: [
          { $ref: getSchemaPath(Response) },
          {
            type: 'object',
            properties: { body: { $ref: getSchemaPath(model) } },
          },
        ],
      },
    }),
  );

/** Documents error responses as `ResponseWithoutBody`. */
export const ApiErrorResponses = (
  ...statuses: { status: number; description: string }[]
) =>
  applyDecorators(
    ...statuses.map((s) => ApiResponse({ ...s, type: ResponseWithoutBody })),
  );
