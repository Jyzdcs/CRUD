import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();

    if (!request.user) {
      request.user = {
        id: 1,
        email: 'test@test.com',
        username: 'test1',
      };
    }
    console.log(request.user);
    request.user = { ...request.user, roles: ['admin'] };
    if (!request.user.roles.includes('admin')) {
      throw new UnauthorizedException('You are not authorized to do this');
    }
    return true;
  }
}
