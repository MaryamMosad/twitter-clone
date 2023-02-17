import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { TweetsService } from './tweets.service';
import { Tweet } from './entities/tweet.entity';
import { CreateTweetInput } from './dto/create-tweet.input';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import { CurrentUser } from '../common/user.decorator';
import { User } from '../users/entities/user.entity';
import { PaginationArgs } from '../common/pagination-args.dto';

@Resolver(() => Tweet)
export class TweetsResolver {
  constructor(private readonly tweetsService: TweetsService) {}

  @UseGuards(AuthGuard)
  @Mutation(() => Tweet)
  createTweet(
    @Args('createTweetInput') createTweetInput: CreateTweetInput,
    @CurrentUser('userId') userId: string,
  ) {
    return this.tweetsService.createTweet(createTweetInput, userId);
  }

  @Query(() => [Tweet], { name: 'tweets' })
  findTweets(@Args() args: PaginationArgs) {
    return this.tweetsService.findAll(args);
  }

  @Query(() => [Tweet], { name: 'UserTweets' })
  findTweetsByUser(@Args('id', { type: () => Int }) id: number) {
    return this.tweetsService.findTweetsByUser(id);
  }

  @Query(() => Tweet, { name: 'tweet' })
  findTweet(@Args('id', { type: () => Int }) id: number) {
    return this.tweetsService.findOne(id);
  }

  @UseGuards(AuthGuard)
  @Mutation(() => Boolean)
  async removeTweet(
    @CurrentUser() user: User,
    @Args('id', { type: () => Int }) id: number,
  ) {
    await this.tweetsService.removeTweet(user.userId, id);
  }
}
