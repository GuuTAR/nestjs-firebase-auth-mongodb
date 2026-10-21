import { ApiProperty } from '@nestjs/swagger';

export class ResponseWithoutBody {
  @ApiProperty({ example: 'Success' })
  message: string;
}

/** `body` is documented per endpoint via `ApiOkResponseOf`. */
export class Response<T = unknown> extends ResponseWithoutBody {
  body: T;
}
