import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TweetsModule } from './tweets/tweets.module';
import { FollowRelaionshipsModule } from './follow-relaionships/follow-relaionships.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { GraphQLModule } from '@nestjs/graphql';

@Module({
  imports: [GraphQLModule.forRoot({
    autoSchemaFile:true,
  })
    ,UsersModule, TweetsModule, FollowRelaionshipsModule,
  SequelizeModule.forRoot({
    dialect: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'me',
    password: 'password',
    database: 'twitterclone',
    models: [],
    autoLoadModels:true,
  })
  ],
  //controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
