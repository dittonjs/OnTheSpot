import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { NonceService } from '../services/nonce.service';
import { UsersService } from '../services/users.service';
import { LTIUtil } from '../util/lti.util';

@Injectable()
export class LTIGuard implements CanActivate {
  constructor(private usersService: UsersService, private ltiUtil: LTIUtil, private nonceService: NonceService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();

    // check nonce
    const validNonce = await this.nonceService.validate(req.body.oauth_nonce);
    if (!validNonce) return false;

    if (this.ltiUtil.isValidLTIRequest(req)) {
      console.log(req.body);
      // create or find user
      return true;
    }
    return false;
  }
}
