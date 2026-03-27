import {
  PipeTransform,
  Injectable,
  BadRequestException,
  ArgumentMetadata,
} from '@nestjs/common'
import { ZodError } from 'zod'
import { HttpStatus } from '@nestjs/common'
import { AppException } from '../filter'

@Injectable()
export class ZodValidationPipe implements PipeTransform {
  private readonly errorHttpStatusCode = HttpStatus.BAD_REQUEST

  transform(value: any, metadata: ArgumentMetadata) {
    const schema =
      (metadata.metatype as any)?.zodSchema ||
      (metadata.metatype as any)?.schema
    if (!schema) {
      return value
    }
    const result = schema.safeParse(value)
    if (!result.success) {
      throw this.buildException(result.error)
    }
    return result.data
  }

  private buildException(error: ZodError): AppException {
    const firstError = error.issues[0]
    return new AppException({
      statusCode: this.errorHttpStatusCode,
      message: firstError.message,
      type: 'ERROR',
      isException: true,
    })
  }
}
