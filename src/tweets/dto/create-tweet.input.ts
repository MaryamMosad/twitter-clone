import { InputType, Int, Field } from '@nestjs/graphql';
import { Column, ForeignKey } from 'sequelize-typescript';
import { User } from '../../users/entities/user.entity';

@InputType()
export class CreateTweetInput {
  @Column
  @Field()
  text:string;

  @ForeignKey(type=> User)
  @Column
  @Field(() => Int)
  userId:number;
}