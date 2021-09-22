import { ForbiddenException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
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
  ) { }
  create(createTweetInput: CreateTweetInput) {
    return this.tweetModel.create(createTweetInput);
  }

  async tweetFinder(model ,...args ){
    const tweet = await model.findOne(...args)
    if (!tweet) {
      throw new NotFoundException;
    }
    return tweet;
  }

  async findAll(): Promise<Tweet[]> {
    return this.tweetModel.findAll();
  }


  async findOne(id: number): Promise<Tweet> {
    return this.tweetFinder(this.tweetModel,{ where: { tweetId: id } })
  }


  async remove(userId:number,tweetId: number) {
    const tweet=await this.tweetFinder(this.tweetModel,{ where: {tweetId:tweetId} })
    if (userId===tweet.userId)
    {return await this.tweetModel.destroy({ where: { tweetId: tweetId } })}
    else 
    throw new ForbiddenException;
  }
}
