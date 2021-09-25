import { Module } from '@nestjs/common';
import { FollowService } from './follow.service';
import { FollowResolver } from './follow.resolver';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from '../users/entities/user.entity';
import { Follow } from './entities/follow.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports:[SequelizeModule.forFeature([User,Follow]),AuthModule],

  providers: [FollowResolver, FollowService],
  exports:[FollowModule]
})
export class FollowModule {}
