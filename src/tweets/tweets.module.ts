import { Module } from '@nestjs/common';
import { TweetsService } from './tweets.service';
import { TweetsResolver } from './tweets.resolver';
import { Tweet } from './entities/tweet.entity';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from '../users/entities/user.entity';
import { AuthGuard } from '../auth/auth.guard';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports:[SequelizeModule.forFeature([User,Tweet]),TweetsModule,AuthModule],
  providers: [TweetsResolver,TweetsService,AuthGuard],
  exports:[TweetsModule,TweetsService]
})
export class TweetsModule {}
