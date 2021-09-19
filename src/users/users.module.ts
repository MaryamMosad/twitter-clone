import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './entities/user.entity';

@Module({
  imports:[SequelizeModule.forFeature([User])],
  providers: [UsersResolver, UsersService]
})
export class UsersModule {}
