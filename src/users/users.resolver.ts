import { Resolver, Query, Mutation, Args, Int, Parent, ResolveField, } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { AuthService } from '../auth/auth.service';
import { UseGuards } from '@nestjs/common';
import { AuthPayload } from './dto/AuthPayload';
import { AuthGuard } from '../auth/auth.guard';
import { CurrentUser } from '../common/user.decorator';
import { PaginationArgs } from '../common/pagination-args.dto'
import { TweetsService } from '../tweets/tweets.service';
import { FollowService } from '../follow/follow.service';
import { GqlUserResponse } from '../common/Response.type';


@Resolver(of => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService,
    private tweetsService: TweetsService,
    private authService: AuthService,
    private followService: FollowService) { }

  @Mutation(() => User)
  signUp(@Args('createUserInput') createUserInput: CreateUserInput) {
    return this.usersService.create(createUserInput);
  }
  @Mutation(returns => AuthPayload)
  async login(@Args('username') username: String,
    @Args('password') password: String): Promise<AuthPayload> {
    return await this.authService.validateUser(username, password);
  }

  @Query(() => GqlUserResponse, { name: 'users' })
  async findUsers(@Args() args: PaginationArgs) {
    return await this.usersService.findAll(args);
  }
  @Query(() => GqlUserResponse, { name: 'user' })
  findUser(@Args('id', { type: () => Int }) id: number) {
    return this.usersService.findOne(id);
  }

  @UseGuards(AuthGuard)
  @Query(() => GqlUserResponse)
  async Profile(@CurrentUser() user: User) {
    const { userId } = user;
    console.log(userId)
    return this.usersService.findOne(userId);
  }

  @ResolveField()
  async tweets(@Parent() user: User) {
    const { userId } = user;
    return this.tweetsService.findTweetsByUser(userId);
  }

  @ResolveField()
  async followers(@Parent() user: User) {
    const { userId } = user;
    return this.followService.findUserFollowers(userId);
  }
  @ResolveField()
  async followings(@Parent() user: User) {
    const { userId } = user;
    return this.followService.findUserFollowings(userId);
  }
  @UseGuards(AuthGuard)
  @Mutation(() => GqlUserResponse)
  updateUser(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
    return this.usersService.update(updateUserInput.id, updateUserInput);
  }

  @UseGuards(AuthGuard)
  @Mutation(() => String)
  async removeUser(@CurrentUser() user: User) {
    await this.usersService.remove(user.userId);
    return 'Successfully Deleted'
  }
}
