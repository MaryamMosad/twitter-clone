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
    this.tweetsService.findAll();
  }

  @Query(() => Tweet, { name: 'tweet' })
  findTweet(@Args('id', { type: () => Int }) id: number) {
    return this.tweetsService.findOne(id);
  }

  @Mutation(() => Tweet)
  removeTweet(@Args('id', { type: () => Int }) id: number) {
    return this.tweetsService.remove(id);
  }
}
