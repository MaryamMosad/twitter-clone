import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './entities/user.entity';
import { TweetsModule } from 'src/tweets/tweets.module';
import { TweetsService } from 'src/tweets/tweets.service';
import { Tweet } from 'src/tweets/entities/tweet.entity';

@Module({
  imports:[SequelizeModule.forFeature([User,Tweet]),UsersModule],
  providers: [UsersResolver, UsersService],
  exports:[UsersService,UsersModule]
})
export class UsersModule {}
