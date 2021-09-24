import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TweetsModule } from './tweets/tweets.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { GraphQLModule } from '@nestjs/graphql';
import { FollowModule } from './follow/follow.module';
import { AuthModule } from './auth/auth.module';


@Module({
  imports: [GraphQLModule.forRoot({
    autoSchemaFile:'schema.gql',
    fieldResolverEnhancers: ['guards']
  })
    ,UsersModule, TweetsModule, FollowModule,
  SequelizeModule.forRoot({
    dialect: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'me',
    password: 'password',
    database: 'twitterclone',
    models: [],
    autoLoadModels:true,
    repositoryMode:true,
  }),
  FollowModule,
  AuthModule
  ],
  //controllers: [AppController],
 providers: [AppService],
})
export class AppModule {}
