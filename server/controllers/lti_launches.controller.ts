import { Body, Controller, Param, Post, Render, UseGuards } from '@nestjs/common';
import { JwtService } from 'server/providers/services/jwt.service';
import { Skip } from 'server/decorators/skip.decorator';
import { AuthGuard } from 'server/providers/guards/auth.guard';
import { LTIGuard } from 'server/providers/guards/lti.guard';
import { UserObj } from 'server/decorators/user.decorator';
import { LTILaunchDto } from 'server/dto/lti_launch.dto';
import { RoleKey } from 'server/entities/role.entity';
import { LTILaunchService } from 'server/providers/services/lti_launch.service';
import { User } from 'server/entities/user.entity';

@Controller()
export class LTILaunchesController {
  constructor(private jwtService: JwtService, private ltiLaunchesService: LTILaunchService) {}

  @Post('/lti_launches')
  @Skip(AuthGuard)
  @UseGuards(LTIGuard)
  @Render('index')
  async index(@Body() body: LTILaunchDto, @UserObj() user) {
    const settings = {
      isLTI: true,
      ltiLaunchParams: body,
      jwt: this.jwtService.issueToken({
        userId: user.id,
        contextId: body.context_id,
        roles: body.ext_roles.split(',') as RoleKey[],
        contentItemReturnUrl: body.content_item_return_url,
      }),
    };
    return { data: JSON.stringify(settings) };
  }

  @Post('/lti_launches/:token')
  @Skip(AuthGuard)
  @UseGuards(LTIGuard)
  @Render('index')
  async show(@Param('token') token: string, @Body() body: LTILaunchDto, @UserObj() user: User) {
    const ltiLaunchConfig = await this.ltiLaunchesService.findByToken(token);
    console.log(ltiLaunchConfig);
    const settings = {
      isLTI: true,
      ltiLaunchParams: body,
      jwt: this.jwtService.issueToken({
        userId: user.id,
        contextId: body.context_id,
        roles: body.ext_roles.split(',') as RoleKey[],
        contentItemReturnUrl: body.content_item_return_url,
      }),
      ltiLaunchConfig,
    };
    return { data: JSON.stringify(settings) };
  }
}
