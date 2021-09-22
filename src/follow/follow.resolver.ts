import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { FollowService } from './follow.service';
import { Follow } from './entities/follow.entity';
import { CreateFollowInput } from './dto/create-follow.input';
import { UpdateFollowInput } from './dto/update-follow.input';
import { HttpCode, HttpStatus } from '@nestjs/common';

@Resolver(() => Follow)
export class FollowResolver {
  constructor(private readonly followService: FollowService) {}

  @Mutation(() => Follow)
  Follow(@Args('createFollowInput') createFollowInput: CreateFollowInput) {
    return this.followService.create(createFollowInput);
  }

  @Query(() => [Follow], { name: 'follow' })
  findAll() {
    return this.followService.findAll();
  }

  @Query(() => Follow, { name: 'follow' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.followService.findOne(id);
  }


  @Mutation(() => String)
  async Unfollow(@Args('id', { type: () => Int }) id: number) {
    await this.followService.remove(id);
    return 'Successfully Deleted';
  }
}
