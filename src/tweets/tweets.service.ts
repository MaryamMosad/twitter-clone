import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from '../users/entities/user.entity';
import { CreateTweetInput } from './dto/create-tweet.input';
import { Tweet } from './entities/tweet.entity';

@Injectable()
export class TweetsService {
  constructor(

    @InjectModel(Tweet)
    private tweetModel: typeof Tweet,
    @InjectModel(User)
    private userModel: typeof User,
  ) { }
  create(createTweetInput: CreateTweetInput) {
    return this.tweetModel.create(createTweetInput);
  }
//a function to find tweets where we can pass different arguments
//it can be used later in other functions instead of returning error message everytime we can't find a tweet
  async tweetFinder(...args ){
    const tweet = await this.tweetModel.findOne(...args)
    if (!tweet) {
      throw new NotFoundException;
    }
    return tweet;
  }

  async findAll(args): Promise<Tweet[]> {
    const { limit, offset } = args;
    return this.tweetModel.findAll({limit:limit,offset:offset});
  }

  async findTweetsByUser(id: number): Promise<Tweet[]> {
    return this.tweetModel.findAll({ where: { userId: id } ,include:
      [{
        model: this.userModel,
        as: 'user',
      },
    ],limit:5})
  }

  async findOne(id: number): Promise<Tweet> {
    return this.tweetFinder({ where: { tweetId: id } })
  }

  async remove(userId:number,tweetId: number) {
    const tweet=await this.tweetFinder({ where: {tweetId:tweetId} })
    if (userId===tweet.userId)
    {return await this.tweetModel.destroy({ where: { tweetId: tweetId } })}
    else 
    throw new ForbiddenException("You are not allowed to delete this tweet");
  }
}
