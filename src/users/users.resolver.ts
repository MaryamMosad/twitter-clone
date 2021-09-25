import { Resolver, Query, Mutation, Args, Int, ObjectType, Parent, ResolveField } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { AuthService } from '../auth/auth.service';
import { forwardRef, Inject, UseGuards } from '@nestjs/common';
import { AuthPayload } from './dto/AuthPayload';
import { AuthGuard } from '../auth/auth.guard';
import { CurrentUser } from '../common/user.decorator';
import {PaginationArgs} from '../common/pagination-args.dto'



@Resolver(of => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService,
    /*@Inject(forwardRef(() => AuthService))
    private tweetsService: TweetsService,*/
    @Inject(forwardRef(() => AuthService))
    private authService: AuthService,) { }

  @Mutation(() => User)
  signUp(@Args('createUserInput') createUserInput: CreateUserInput) {
    return this.usersService.create(createUserInput);
  }
  @Mutation(returns => AuthPayload)
  async login(@Args('username') username: String,
  @Args('password') password: String):Promise<AuthPayload>{
    return await this.authService.validateUser(username,password);
  }

  @Query(() => [User], { name: 'users' })
  findUsers(@Args() args: PaginationArgs) {
    return this.usersService.findAll(args);
  }
  @Query(() => User, { name: 'user' })
  findUser(@Args('id', { type: () => Int }) id: number) {
    return this.usersService.findOne(id);
    }

  @UseGuards(AuthGuard)
  @Query(() => User)
  async Profile(@CurrentUser()  user: User) {
    return this.usersService.findOne(user.userId);
  }
  

  @UseGuards(AuthGuard)
  @Mutation(() => User)
  updateUser(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
    return this.usersService.update(updateUserInput.id, updateUserInput);
  }
  
  
  @UseGuards(AuthGuard)
  @Mutation(() => String)
  async removeUser(@CurrentUser()  user: User) {
    await this.usersService.remove(user.userId);
    return 'Successfully Deleted'
  }
  
}
