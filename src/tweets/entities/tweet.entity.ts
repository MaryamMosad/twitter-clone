import { ObjectType, Field, Int } from '@nestjs/graphql';
import {
  Model,
  Table,
  Column,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { User } from '../../users/entities/user.entity';

@Table
@ObjectType()
export class Tweet extends Model {
  @Column({ primaryKey: true, autoIncrement: true })
  @Field(() => Int)
  tweetId: number;

  @Column
  @Field()
  text: string;

  @Column
  createdAt: Date;

  @ForeignKey((type) => User)
  @Column
  @Field(() => Int)
  userId: number;

  @BelongsTo(() => User)
  user: User;
}
