import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { TweetsService } from './tweets.service';
import { Tweet } from './entities/tweet.entity';
import { CreateTweetInput } from './dto/create-tweet.input';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { CurrentUser } from 'src/common/user.decorator';
import { User } from 'src/users/entities/user.entity';
import { PaginationArgs } from 'src/common/pagination-args.dto';

@Resolver(() => Tweet)
export class TweetsResolver {
  constructor(private readonly tweetsService: TweetsService) {}

  @UseGuards(AuthGuard)
  @Mutation(() => Tweet)
  createTweet(@Args('createTweetInput') createTweetInput: CreateTweetInput) {
    return this.tweetsService.create(createTweetInput);
  }

  @Query(() => [Tweet], { name: 'tweets' })
  findTweets(@Args() args: PaginationArgs) {
    return this.tweetsService.findAll(args);
  }
  @Query(() => [Tweet], { name: 'UserTweets' })
  findTweetsByUser(@Args('id', { type: () => Int },) id: number){
    return this.tweetsService.findTweetsByUser(id);
  }

  @Query(() => Tweet, { name: 'tweet' })
  findTweet(@Args('id', { type: () => Int }) id: number) {
    return this.tweetsService.findOne(id);
  }
  @UseGuards(AuthGuard)
  @Mutation(() => String)
  async removeTweet(@CurrentUser()  user: User,
    @Args('id', { type: () => Int }) id: number,
  ) {
    await this.tweetsService.remove(user.userId,id);
    return "Tweet deleted"
  }
}
