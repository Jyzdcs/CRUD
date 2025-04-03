import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  Logger,
} from '@nestjs/common';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(HttpExceptionFilter.name);

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    const status = exception.getStatus() ? exception.getStatus() : 500;
    const exceptionResponse = exception.getResponse();

    const errorResponse =
      typeof exceptionResponse === 'string'
        ? {
            statusCode: status,
            message: exception.message || 'Internal server error',
            timestamp: new Date().toISOString(),
            path: request.url,
            object_sended: request.body,
          }
        : {
            ...exceptionResponse,
            object_sended: request.body,
          };

    return response.status(status).json(errorResponse);
  }
}
