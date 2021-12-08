import { Injectable } from '@nestjs/common';
import { Request } from 'express';
import { clone } from 'lodash';
import * as oauth from 'oauth-signature';
import * as crypto from 'crypto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class LTIUtil {
  public isValidLTIRequest(req: Request): boolean {
    const url = 'https://' + req.headers.host + req.originalUrl;
    const body = clone(req.body);
    delete body.oauth_signature;
    const generatedSignature = decodeURIComponent(oauth.generate(req.method, url, body, process.env.LTI_SECRET));
    return generatedSignature === req.body.oauth_signature;
  }

  public generateRandomEmail(): string {
    return `${crypto.randomBytes(36).toString('hex')}@example.com`;
  }

  public generateRandomPasswordHash(): Promise<string> {
    const password = crypto.randomBytes(48).toString('hex');
    return bcrypt.hash(password, 10);
  }

  public generateContentItem(title: string, url: string) {
    return this.contentItems([
      {
        '@type': 'LtiLinkItem',
        mediaType: 'application/vnd.ims.lti.v1.ltilink',
        url,
        title,
      },
    ]);
  }

  private contentItems(graph: Record<string, any>[]) {
    return {
      '@context': 'http://purl.imsglobal.org/ctx/lti/v1/ContentItem',
      '@graph': graph,
    };
  }
}
