import { HttpCode, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './entities/user.entity';
import { Tweet } from '../tweets/entities/tweet.entity';
import { Follow } from '../follow/entities/follow.entity';


@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
    @InjectModel(Tweet)
    private tweetModel: typeof Tweet,
    @InjectModel(Follow)
    private followModel: typeof Follow,
  ) { }
  async create(createUserInput: CreateUserInput): Promise<User> {
    if (createUserInput.password !== createUserInput.passwordConfirm) {
      throw new Error('Please Confirm your password')
    }
    const user = await this.userModel.create(createUserInput)
    return user;

  }
  //A function to find a single user , used for multiple purposes to prevent repeating code
  async userFinder(...args) {
    const user = await this.userModel.findOne(...args)
    if (!user) {
      throw new NotFoundException("This user doesn't exist");
    }
    return user;
  }

  async findAll(args): Promise<any> {
    const { limit, offset } = args;
    const dataArray=await this.userModel.findAll({
      limit: limit, offset: offset
    });
    const total=dataArray.length;
    return {dataArray,total, statusCode:HttpStatus.FOUND,message:"All users found"}
  }

  async findOne(id: number): Promise<any> {
    const data= await this.userFinder({
      where: { userId: id },
      /*include:
        [{
          model: this.userModel,
          as: 'followers',
        }
      ]*/
      })
      return{data,total:1, statusCode:600,message:"User found"}
}

  async update(id: number, updateUserInput: UpdateUserInput) {
    await this.userModel.update(updateUserInput, { where: { userId: id } });
    return await this.findOne(id)
  }


  async remove(id: number) {
    await this.userFinder({ where: { userId: id } })
    return await this.userModel.destroy({ where: { userId: id } })
  }
}
