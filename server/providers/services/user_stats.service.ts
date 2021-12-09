import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from '../../entities/user.entity';
import { UserStat } from 'server/entities/user_stat.entity';

@Injectable()
export class UserStatsService {
  constructor(
    @InjectRepository(UserStat)
    private userStatRepository: Repository<UserStat>,
  ) {}

  findAllInContext(contextId: string) {
    return this.userStatRepository.find({ contextId });
  }

  create(userStat: UserStat) {
    return this.userStatRepository.save(userStat);
  }

  update(userStat: UserStat) {
    return this.userStatRepository.save(userStat);
  }
}
