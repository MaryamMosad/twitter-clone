import { Module } from '@nestjs/common';
import { FollowService } from './follow.service';
import { FollowResolver } from './follow.resolver';
import { SequelizeModule } from '@nestjs/sequelize';
import { Tweet } from 'src/tweets/entities/tweet.entity';
import { User } from 'src/users/entities/user.entity';
import { Follow } from './entities/follow.entity';

@Module({
  imports:[SequelizeModule.forFeature([User,Follow])],

  providers: [FollowResolver, FollowService],
  exports:[FollowModule]
})
export class FollowModule {}
