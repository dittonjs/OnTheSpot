import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LTILaunchesController } from 'server/controllers/api/lti_launches.controller';
import { LTILaunch } from 'server/entities/lti_launch.entity';
import { LTILaunchService } from 'server/providers/services/lti_launch.service';
import { LTIUtil } from 'server/providers/util/lti.util';
import { UsersModule } from './users.module';

@Module({
  imports: [UsersModule, TypeOrmModule.forFeature([LTILaunch])],
  controllers: [LTILaunchesController],
  providers: [LTIUtil, LTILaunchService],
  exports: [TypeOrmModule, LTILaunchService, LTIUtil],
})
export class ApiModule {}
