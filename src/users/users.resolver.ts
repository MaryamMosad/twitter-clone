import { Resolver, Query, Mutation, Args, Int, ObjectType } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { AuthService } from 'src/auth/auth.service';
import { forwardRef, Inject, UseGuards } from '@nestjs/common';
import { AuthPayload } from './dto/AuthPayload';
import { AuthGuard } from 'src/auth/auth.guard';


@Resolver(of => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService,
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
  findUsers() {
    return this.usersService.findAll();
  }

  
  @UseGuards(AuthGuard)
  @Query(() => User, { name: 'user' })
  findUser(@Args('id', { type: () => Int }) id: number) {
    return this.usersService.findOne(id);
  }

  @Mutation(() => User)
  updateUser(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
    return this.usersService.update(updateUserInput.id, updateUserInput);
  }

  @Mutation(() => String)
  async removeUser(@Args('id', { type: () => Int }) id: number) {
    await this.usersService.remove(id);
    return 'Successfully Deleted'
  }
}
