import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'

export interface APIResponse<T> {
  statusCode: number | undefined
  message: string
  data?: T
  timestamp: string
}

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<
  T,
  APIResponse<T>
> {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<APIResponse<T>> {
    const ctx = context.switchToHttp()
    const response = ctx.getResponse()
    const statusCode = response.statusCode

    return next.handle().pipe(
      map(data => ({
        statusCode: statusCode,
        message: data?.message || 'Success',
        ...(data?.data !== undefined ? { data: data.data } : {}),
        timestamp: new Date().toISOString(),
      })),
    )
  }
}
