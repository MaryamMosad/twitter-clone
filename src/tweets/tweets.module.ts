import { Module } from '@nestjs/common';
import { TweetsService } from './tweets.service';
import { TweetsResolver } from './tweets.resolver';
import { Tweet } from './entities/tweet.entity';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from '../users/entities/user.entity';

@Module({
  imports: [SequelizeModule.forFeature([User, Tweet])],
  providers: [TweetsResolver, TweetsService],
  exports: [TweetsService]
})
export class TweetsModule { }
