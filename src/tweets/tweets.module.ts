import { Module } from '@nestjs/common';
import { TweetsService } from './tweets.service';
import { TweetsResolver } from './tweets.resolver';
import { Tweet } from './entities/tweet.entity';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from 'src/users/entities/user.entity';

@Module({
  imports:[SequelizeModule.forFeature([User,Tweet]),TweetsModule],
  providers: [TweetsResolver,TweetsService],
  exports:[TweetsModule,TweetsService]
})
export class TweetsModule {}
