import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { FollowRelaionshipsService } from './follow-relaionships.service';
import { FollowRelaionship } from './entities/follow-relaionship.entity';
import { CreateFollowRelaionshipInput } from './dto/create-follow-relaionship.input';
import { UpdateFollowRelaionshipInput } from './dto/update-follow-relaionship.input';

@Resolver(() => FollowRelaionship)
export class FollowRelaionshipsResolver {
  constructor(private readonly followRelaionshipsService: FollowRelaionshipsService) {}

  @Mutation(() => FollowRelaionship)
  createFollowRelaionship(@Args('createFollowRelaionshipInput') createFollowRelaionshipInput: CreateFollowRelaionshipInput) {
    return this.followRelaionshipsService.create(createFollowRelaionshipInput);
  }

  @Query(() => [FollowRelaionship], { name: 'followRelaionships' })
  findAll() {
    return this.followRelaionshipsService.findAll();
  }

  @Query(() => FollowRelaionship, { name: 'followRelaionship' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.followRelaionshipsService.findOne(id);
  }

  @Mutation(() => FollowRelaionship)
  updateFollowRelaionship(@Args('updateFollowRelaionshipInput') updateFollowRelaionshipInput: UpdateFollowRelaionshipInput) {
    return this.followRelaionshipsService.update(updateFollowRelaionshipInput.id, updateFollowRelaionshipInput);
  }

  @Mutation(() => FollowRelaionship)
  removeFollowRelaionship(@Args('id', { type: () => Int }) id: number) {
    return this.followRelaionshipsService.remove(id);
  }
}
