import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const User = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    request.user = {
      id: 1,
      email: 'test@test.com',
      username: 'test1',
      roles: ['admin'],
    };
    return request.user;
  },
);
