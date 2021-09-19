import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Model } from 'sequelize';
import { Column, PrimaryKey, Table } from 'sequelize-typescript';

@Table
@ObjectType()
export class FollowRelaionship extends Model{
  @Column({primaryKey: true,autoIncrement:true})
  @Field(() => Int)
  relationshipId: number;
  //foreign keys
  /*@Column
  @Field()
  followerId:number

  @Column
  @Field(() => Int)
  followedId:number*/
}
