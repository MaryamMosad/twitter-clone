import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateTweetInput } from './dto/create-tweet.input';
import { Tweet } from './entities/tweet.entity';

@Injectable()
export class TweetsService {
  constructor(@InjectModel(Tweet) private tweetModel: typeof Tweet) {}

  createTweet(createTweetInput: CreateTweetInput, userId: string) {
    return this.tweetModel.create({ userId, ...createTweetInput });
  }

  async findAll(args): Promise<Tweet[]> {
    const { limit, offset } = args;
    return this.tweetModel.findAll({ limit: limit, offset: offset });
  }

  async findTweetsByUser(id: number): Promise<Tweet[]> {
    return this.tweetModel.findAll({ where: { userId: id } });
  }

  async findOne(id: number): Promise<Tweet> {
    const tweet = await this.tweetModel.findOne({ where: { tweetId: id } });
    if (!tweet) {
      throw new NotFoundException();
    }
    return tweet;
  }

  async removeTweet(userId: number, tweetId: number) {
    const tweet = await this.findOne(tweetId);
    if (userId === tweet.userId) {
      return !!(await this.tweetModel.destroy({ where: { tweetId: tweetId } }));
    } else {
      throw new ForbiddenException('You are not allowed to delete this tweet');
    }
  }
}
