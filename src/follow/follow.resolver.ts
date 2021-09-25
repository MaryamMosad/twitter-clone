import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { FollowService } from './follow.service';
import { Follow } from './entities/follow.entity';
import { CreateFollowInput } from './dto/create-follow.input';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import { PaginationArgs } from '../common/pagination-args.dto';


@UseGuards(AuthGuard)
@Resolver(() => Follow)
export class FollowResolver {
  constructor(private readonly followService: FollowService) {}

  @Mutation(() => Follow)
  Follow_Unfollow(@Args('createFollowInput') createFollowInput: CreateFollowInput) {
    return this.followService.create(createFollowInput);
  }

  @Query(() => [Follow], { name: 'UserFollowers' })
  Followers(@Args() args: PaginationArgs,
    @Args('id', { type: () => Int }) id: number){
    return this.followService.findUserFollowers(args,id);
  }
  @Query(() => [Follow], { name: 'UserFollowings' })
  Followings(@Args() args: PaginationArgs,
  @Args('id', { type: () => Int }) id: number){
    return this.followService.findUserFollowings(args,id);
  }
  
}
