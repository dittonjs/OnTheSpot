import { Injectable } from '@nestjs/common';
import { Request } from 'express';
import { URL } from 'url';
import { clone } from 'lodash';
import * as oauth from 'oauth-signature';

@Injectable()
export class LTIUtil {
  public isValidLTIRequest(req: Request) {
    const url = 'https://' + req.headers.host + req.originalUrl;
    const body = clone(req.body);
    delete body.oauth_signature;
    const generatedSignature = decodeURIComponent(oauth.generate(req.method, url, body, process.env.LTI_SECRET));
    return generatedSignature === req.body.oauth_signature;
  }
}
