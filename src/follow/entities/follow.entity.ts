import { ObjectType, Field, Int } from '@nestjs/graphql';
import {
  Column,
  ForeignKey,
  Table,
  BelongsTo,
  Model,
} from 'sequelize-typescript';
import { User } from '../../users/entities/user.entity';

@Table
@ObjectType()
export class Follow extends Model {
  @Column({ primaryKey: true, autoIncrement: true })
  @Field(() => Int)
  followId: number;

  @ForeignKey((type) => User)
  @Column
  @Field(() => Int)
  followerId: number;

  @BelongsTo(() => User)
  follower: User;

  @ForeignKey((type) => User)
  @Column
  @Field(() => Int)
  followingId: number;

  @BelongsTo(() => User)
  following: User;
}
