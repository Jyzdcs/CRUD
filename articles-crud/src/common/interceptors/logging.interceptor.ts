import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const now = Date.now();
    return next.handle().pipe(
      tap(() =>
        console.log({
          timestamp: new Date().toISOString(),
          level: 'info',
          duration: `${Date.now() - now}ms`,
          event: 'request',
        }),
      ),
    );
  }
}
