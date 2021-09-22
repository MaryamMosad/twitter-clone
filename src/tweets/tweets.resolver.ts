import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { TweetsService } from './tweets.service';
import { Tweet } from './entities/tweet.entity';
import { CreateTweetInput } from './dto/create-tweet.input';

@Resolver(() => Tweet)
export class TweetsResolver {
  constructor(private readonly tweetsService: TweetsService) {}

  @Mutation(() => Tweet)
  createTweet(@Args('createTweetInput') createTweetInput: CreateTweetInput) {
    return this.tweetsService.create(createTweetInput);
  }

  @Query(() => [Tweet], { name: 'tweets' })
  findTweets() {
    return this.tweetsService.findAll();
  }

  @Query(() => Tweet, { name: 'tweet' })
  findTweet(@Args('id', { type: () => Int }) id: number) {
    return this.tweetsService.findOne(id);
  }

  @Mutation(() => String)
  async removeTweet(@Args('id', { type: () => Int }) id: number,
  @Args('userId', { type: () => Int }) userId: number) {
    await this.tweetsService.remove(userId,id);
    return "Tweet deleted"
  }
}
