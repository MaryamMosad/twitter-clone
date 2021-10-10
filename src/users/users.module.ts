import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './entities/user.entity';
import { Tweet } from '../tweets/entities/tweet.entity';
import { Follow } from '../follow/entities/follow.entity';
import { TweetsService } from '../tweets/tweets.service';
import { FollowService } from '../follow/follow.service';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [SequelizeModule.forFeature([User, Tweet, Follow]), AuthModule],
  providers: [UsersResolver, UsersService, TweetsService, FollowService],
  exports: [UsersService]
})
export class UsersModule { }
