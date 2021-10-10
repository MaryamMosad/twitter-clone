import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './entities/user.entity';
import { Tweet } from '../tweets/entities/tweet.entity';
import { Follow } from '../follow/entities/follow.entity';
import { TweetsService } from '../tweets/tweets.service';
import { FollowService } from '../follow/follow.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [SequelizeModule.forFeature([User, Tweet, Follow]),
  JwtModule.register({
    secret: 'SecretKEYYY',
    signOptions: { expiresIn: '12h' }
  })],
  providers: [UsersResolver, UsersService, TweetsService, FollowService],
  exports: [UsersService]
})
export class UsersModule { }
