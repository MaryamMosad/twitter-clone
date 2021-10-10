import { Module } from '@nestjs/common';
import { FollowService } from './follow.service';
import { FollowResolver } from './follow.resolver';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from '../users/entities/user.entity';
import { Follow } from './entities/follow.entity';

@Module({
  imports: [SequelizeModule.forFeature([User, Follow])],

  providers: [FollowResolver, FollowService],
  exports: [FollowService]
})
export class FollowModule { }
