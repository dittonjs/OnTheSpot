import { Body, Controller, Get, HttpException, Post, Render, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { UsersService } from 'server/providers/services/users.service';
import { SignInDto } from 'server/dto/sign_in.dto';
import { RefreshTokenBody } from 'server/dto/refresh_token_body.dto';
import { JwtService } from 'server/providers/services/jwt.service';
import { Skip } from 'server/decorators/skip.decorator';
import { AuthGuard } from 'server/providers/guards/auth.guard';
import { RolesService } from 'server/providers/services/roles.service';
import { LTIGuard } from 'server/providers/guards/lti.guard';

// this is kind of a misnomer because we are doing token based auth
// instead of session based auth
@Controller()
export class LTILaunchesController {
  @Post('/lti_launches')
  @Skip(AuthGuard)
  @UseGuards(LTIGuard)
  @Render('index')
  async index() {}
}
