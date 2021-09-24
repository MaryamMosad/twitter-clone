import { Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { SequelizeModule } from '@nestjs/sequelize';
import { Follow } from 'src/follow/entities/follow.entity';
import { Tweet } from 'src/tweets/entities/tweet.entity';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';

@Module({
  imports:[SequelizeModule.forFeature([User,Tweet,Follow]),
JwtModule.register({
  secret:'SecretKEYYY',
  signOptions:{expiresIn:'1d'}
})] ,
  providers: [AuthService,UsersService,AuthGuard],
  exports:[AuthService,AuthModule,AuthGuard],
})
export class AuthModule {}
