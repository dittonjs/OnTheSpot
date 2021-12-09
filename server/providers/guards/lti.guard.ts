import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { LTILaunchDto } from 'server/dto/lti_launch.dto';
import { RoleKey } from 'server/entities/role.entity';
import { User } from 'server/entities/user.entity';
import { UserRole } from 'server/entities/user_role.entity';
import { NonceService } from '../services/nonce.service';
import { RolesService } from '../services/roles.service';
import { UsersService } from '../services/users.service';
import { LTIUtil } from '../util/lti.util';

@Injectable()
export class LTIGuard implements CanActivate {
  constructor(
    private usersService: UsersService,
    private ltiUtil: LTIUtil,
    private nonceService: NonceService,
    private rolesService: RolesService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const body = req.body as LTILaunchDto;

    // check nonce
    const validNonce = await this.nonceService.validate(body.oauth_nonce);
    if (!validNonce) return false;

    if (this.ltiUtil.isValidLTIRequest(req)) {
      // try to find existing user
      let user = await this.usersService.findBy({ lmsUserId: body.custom_canvas_user_id }, ['userRoles']);

      if (!user) {
        user = new User();
        user.email = this.ltiUtil.generateRandomEmail();
        user.passwordHash = await this.ltiUtil.generateRandomPasswordHash();
        user.firstName = body.lis_person_name_given;
        user.lastName = body.lis_person_name_family;
        user.lmsEmail = body.lis_person_contact_email_primary;
        user.lmsUserId = body.custom_canvas_user_id;
        const roleKeys: RoleKey[] = body.ext_roles.split(',') as RoleKey[];
        const roles = await this.rolesService.findByKey(...roleKeys);
        user.userRoles = roles.map((role) => {
          const userRole = new UserRole();
          userRole.contextId = body.context_id;
          userRole.role = role;
          return userRole;
        });
        user = await this.usersService.create(user);
      }

      req.user = user;
      return true;
    }
    return false;
  }
}
