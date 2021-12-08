import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from 'server/entities/user.entity';

export const UserObj = createParamDecorator((data: unknown, ctx: ExecutionContext): User => {
  const req = ctx.switchToHttp().getRequest();
  return req.user;
});
