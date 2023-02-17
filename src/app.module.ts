import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { TweetsModule } from './tweets/tweets.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { GraphQLModule } from '@nestjs/graphql';
import { FollowModule } from './follow/follow.module';
import { AuthModule } from './auth/auth.module';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';

@Module({
  imports: [
    GraphQLModule.forRoot({
      driver: ApolloDriver,
      autoSchemaFile: 'schema.gql',
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: 'localhost',
      port: 5432,
      username: `postgres`,
      password: `m@123456`,
      database: 'twitter-clone',
      models: [],
      autoLoadModels: true,
      repositoryMode: true,
    }),
    FollowModule,
    AuthModule,
    UsersModule,
    TweetsModule,
    FollowModule,
  ],
})
export class AppModule {}
