import { InputType, Int, Field } from '@nestjs/graphql';
import { ForeignKey, Column } from 'sequelize-typescript';
import { User } from 'src/users/entities/user.entity';

@InputType()
export class CreateFollowInput {
  //the person who follows another user
  @ForeignKey(type=> User)
  @Column
  @Field(() => Int)
  followerId:number;

  //the person to be followed
  @ForeignKey(type=> User)
  @Column
  @Field(() => Int)
  followingId:number;
}
