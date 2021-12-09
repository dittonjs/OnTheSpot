import { Body, Controller, Post, Req } from '@nestjs/common';
import { LTILaunch } from 'server/entities/lti_launch.entity';
import { LTILaunchService } from 'server/providers/services/lti_launch.service';
import { LTIUtil } from 'server/providers/util/lti.util';
import * as crypto from 'crypto';
import * as oauth from 'oauth-signature';
import { JwtBody } from 'server/decorators/jwt_body.decorator';
import { JwtBodyDto } from 'server/dto/jwt_body.dto';
import { Request } from 'express';

@Controller()
export class LTILaunchesController {
  constructor(private ltiLaunchService: LTILaunchService, private ltiUtil: LTIUtil) {}

  @Post('/api/lti_launches')
  async create(@Body() config: Record<string, any>, @JwtBody() jwtBody: JwtBodyDto, @Req() req: Request) {
    let ltiLaunch = new LTILaunch();
    console.log(config, req.body);
    ltiLaunch.config = config;
    ltiLaunch.token = crypto.randomBytes(16).toString('hex');
    ltiLaunch = await this.ltiLaunchService.create(ltiLaunch);
    const nonce = crypto.randomBytes(16).toString('base64');
    const response: Record<string, any> = {
      content_items: JSON.stringify(
        this.ltiUtil.generateContentItem('LTI Content Item', `${process.env.APP_URL}/lti_launches/${ltiLaunch.token}`),
      ),
      lti_message_type: 'ContentItemSelection',
      lti_version: 'LTI-1p0',
      oauth_consumer_key: process.env.LTI_KEY,
      oauth_nonce: nonce,
      oauth_signature_method: 'HMAC-SHA1',
      oauth_timestamp: `${Math.floor(Date.now() / 1000)}`,
      oauth_version: '1.0',
    };

    response.oauth_signature = decodeURIComponent(
      oauth.generate('POST', jwtBody.contentItemReturnUrl, response, process.env.LTI_SECRET),
    );
    return response;
  }
}
