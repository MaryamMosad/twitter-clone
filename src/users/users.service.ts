import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './entities/user.entity';
import { Tweet } from 'src/tweets/entities/tweet.entity';
import { Follow } from 'src/follow/entities/follow.entity';


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
  async userFinder(model ,...args ){
    const user = await model.findOne(...args)
    if (!user) {
      throw new NotFoundException;
    }
    return user;
  }

  async findAll(): Promise<User[]> {
    return this.userModel.findAll({
      include: [{ model: this.tweetModel }, {
        model: this.userModel,
        as: 'followers',
      },
      {
        model: this.userModel,
        as: 'followings'
      }]
    });
  }

  async findOne(id: number): Promise<User> {
    return await this.userFinder(this.userModel,{
      where: { userId: id },
      include:
        [{ model: this.tweetModel }, {
          model: this.userModel,
          as: 'followers',
        }]
      })
  }

  async update(id: number, updateUserInput: UpdateUserInput) {
    await this.userModel.update(updateUserInput, { where: { userId: id } });
    return await this.userFinder(this.userModel,{ where: { userId: id } })
  }


  async remove(id: number) {
    await this.userFinder(this.userModel,{ where: { userId: id } })
      return await this.userModel.destroy({ where: { userId: id } })
  }
}
