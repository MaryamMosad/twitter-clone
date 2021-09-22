import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TweetsModule } from './tweets/tweets.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { GraphQLModule } from '@nestjs/graphql';
import { FollowModule } from './follow/follow.module';
import { AuthModule } from './auth/auth.module';
import { AuthGuard } from './auth/auth.guard';
import { AuthService } from './auth/auth.service';


@Module({
  imports: [GraphQLModule.forRoot({
    autoSchemaFile:'schema.gql',
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
 /* providers: [AppService,
  {provide:'AuthGuard',
  useClass:AuthGuard,
}],*/
})
export class AppModule {}
