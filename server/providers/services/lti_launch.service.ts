import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LTILaunch } from 'server/entities/lti_launch.entity';
import { Repository } from 'typeorm';

@Injectable()
export class LTILaunchService {
  constructor(
    @InjectRepository(LTILaunch)
    private ltiLaunchRepository: Repository<LTILaunch>,
  ) {}

  findByToken(token: string) {
    return this.ltiLaunchRepository.findOne({ token });
  }

  create(ltiLaunch: LTILaunch) {
    return this.ltiLaunchRepository.save(ltiLaunch);
  }
}
