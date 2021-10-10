import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { SequelizeModule } from '@nestjs/sequelize';
import { Follow } from '../follow/entities/follow.entity';
import { Tweet } from '../tweets/entities/tweet.entity';
import { User } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';

@Module({
  imports: [SequelizeModule.forFeature([User, Tweet, Follow]),
  JwtModule.register({
    secret: 'SecretKEYYY',
    signOptions: { expiresIn: '12h' }
  })],
  providers: [AuthService, UsersService, AuthGuard],
  exports: [AuthService, AuthGuard],
})
export class AuthModule { }
