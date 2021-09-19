import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Model } from 'sequelize';
import { Table, Column, ForeignKey } from 'sequelize-typescript';
import { User } from 'src/users/entities/user.entity';

@Table
@ObjectType()
export class Tweet extends Model{
  @Column({primaryKey: true,autoIncrement:true})
  @Field(() => Int)
  tweetId: number;

  @Column
  @Field()
  text:string;

  @Column
  @Field()
  createdAt:Date;

  /*@ForeignKey(type=>User)
  @Column
  @Field(() => Int)
  userId:number;*/
}
