import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LTILaunchesController } from 'server/controllers/api/lti_launches.controller';
import { UserStatsController } from 'server/controllers/api/user_stats.controller';
import { LTILaunch } from 'server/entities/lti_launch.entity';
import { UserStat } from 'server/entities/user_stat.entity';
import { LTILaunchService } from 'server/providers/services/lti_launch.service';
import { UserStatsService } from 'server/providers/services/user_stats.service';
import { LTIUtil } from 'server/providers/util/lti.util';
import { UsersModule } from './users.module';

@Module({
  imports: [UsersModule, TypeOrmModule.forFeature([LTILaunch, UserStat])],
  controllers: [LTILaunchesController, UserStatsController],
  providers: [LTIUtil, LTILaunchService, UserStatsService],
  exports: [TypeOrmModule, LTILaunchService, LTIUtil],
})
export class ApiModule {}
