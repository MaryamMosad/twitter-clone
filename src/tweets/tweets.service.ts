import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Repository } from 'sequelize-typescript';
import { User } from 'src/users/entities/user.entity';
import { CreateTweetInput } from './dto/create-tweet.input';
import { Tweet } from './entities/tweet.entity';

@Injectable()
export class TweetsService {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
    @InjectModel(Tweet)
    private tweetModel: typeof Tweet,
  ){}
  create(createTweetInput: CreateTweetInput) {
    return this.tweetModel.create(createTweetInput) ;
  }

  async findAll():Promise<Tweet[]> {
    return this.tweetModel.findAll();
    
  }

  async findOne(id: number):Promise<Tweet> {
    const tweet=await this.tweetModel.findOne({where:{tweetId:id}});
    if(!tweet){
      throw new NotFoundException();
    }
    return tweet ;
  }


    remove(id: number) {
    return `This action removes a #${id} tweet`;
  }
}
