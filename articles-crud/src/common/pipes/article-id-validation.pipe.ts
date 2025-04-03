import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';

@Injectable()
export class ArticleIdValidationPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    if (!value) {
      throw new BadRequestException('Article ID must be provided');
    }
    const safeIdRegex = /^[1-9]\d*$/;
    if (!safeIdRegex.test(value)) {
      throw new BadRequestException('Article ID contains invalid characters');
    }
    return value;
  }
}
