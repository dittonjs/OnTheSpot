import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LTILaunchesController } from 'server/controllers/lti_launches.controller';
import { Nonce } from 'server/entities/nonce.entity';
import { LTIGuard } from 'server/providers/guards/lti.guard';
import { NonceService } from 'server/providers/services/nonce.service';
import { LTIUtil } from 'server/providers/util/lti.util';
import { ApiModule } from './api.module';
import { UsersModule } from './users.module';

@Module({
  imports: [UsersModule, TypeOrmModule.forFeature([Nonce]), ApiModule],
  controllers: [LTILaunchesController],
  providers: [NonceService, LTIUtil, LTIGuard],
})
export class LTILaunchesModule {}
