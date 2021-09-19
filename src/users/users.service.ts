import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcryptjs'


@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
  ){}
  async create(createUserInput: CreateUserInput):Promise<User> {
    if (createUserInput.password !==createUserInput.passwordConfirm){
      throw new Error('Please Confirm your password')
    }
    const user=await this.userModel.create(createUserInput)
    return user;
    
  }

  async findAll():Promise<User[]> {
    return this.userModel.findAll();
  }

  findOne(id: number):Promise<User> {
    const user=this.userModel.findByPk(id);
    if(!user){
      throw new NotFoundException();
    }
    return user ;
  }

  update(id: number, updateUserInput: UpdateUserInput) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
