import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './entities/user.entity';
import { Tweet } from 'src/tweets/entities/tweet.entity';
import { Follow } from 'src/follow/entities/follow.entity';
import { AuthService } from 'src/auth/auth.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { AuthModule } from 'src/auth/auth.module';
import { AuthGuard } from 'src/auth/auth.guard';

@Module({
  imports:[SequelizeModule.forFeature([User,Tweet,Follow]),
  JwtModule.register({
    secret:'SecretKEYYY',
    signOptions:{expiresIn:'333360s'}
  }),AuthModule],
  providers: [UsersResolver, UsersService,AuthService,AuthGuard,],
  exports:[UsersService,UsersModule,]
})
export class UsersModule {}