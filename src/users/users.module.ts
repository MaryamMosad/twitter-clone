import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './entities/user.entity';
import { Tweet } from '../tweets/entities/tweet.entity';
import { Follow } from '../follow/entities/follow.entity';
import { AuthService } from '../auth/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { AuthGuard } from '../auth/auth.guard';
import { TweetsModule } from '../tweets/tweets.module';
import { TweetsService } from '../tweets/tweets.service';
import { FollowService } from '../follow/follow.service';

@Module({
  imports:[SequelizeModule.forFeature([User,Tweet,Follow]),
  JwtModule.register({
    secret:'SecretKEYYY',
    signOptions:{expiresIn:'333360s'}
  }),TweetsModule],
  providers: [UsersResolver, UsersService,AuthService,AuthGuard,TweetsService,FollowService],
  exports:[UsersService,UsersModule,]
})
export class UsersModule {}
