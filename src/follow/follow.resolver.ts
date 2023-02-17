import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { FollowService } from './follow.service';
import { Follow } from './entities/follow.entity';
import { CreateFollowInput } from './dto/create-follow.input';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import { CurrentUser } from 'src/common/user.decorator';

@UseGuards(AuthGuard)
@Resolver(() => Follow)
export class FollowResolver {
  constructor(private readonly followService: FollowService) {}

  @Mutation(() => Boolean)
  Follow_Unfollow(
    @Args('createFollowInput') createFollowInput: CreateFollowInput,
    @CurrentUser('userId') userId: number,
  ) {
    return this.followService.followUnfollow(createFollowInput, userId);
  }
}
