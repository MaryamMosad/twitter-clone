import { ObjectType, Field, Int, ResolveField, ID } from '@nestjs/graphql';
import {
  Model,
  AutoIncrement,
  Column,
  DataType,
  HasMany,
  Table,
  BeforeCreate,
  BelongsToMany,
  PrimaryKey,
} from 'sequelize-typescript';
import { Tweet } from '../../tweets/entities/tweet.entity';
import * as bcrypt from 'bcryptjs';
import { Follow } from '../../follow/entities/follow.entity';

@Table
@ObjectType()
export class User extends Model {
  // @PrimaryKey
  // @AutoIncrement
  @Column({ primaryKey: true, autoIncrement: true })
  @Field(() => Int)
  userId: number;

  @Column
  @Field()
  username: string;

  @Column
  @Field()
  email: string;

  @Column
  password: string;

  @HasMany(() => Tweet)
  tweets?: Tweet[];

  @BelongsToMany(() => User, () => Follow, 'followingId')
  followers?: User[];

  @BelongsToMany(() => User, () => Follow, 'followerId')
  followings?: User[];

  @BeforeCreate
  public static async hashPassword(user: User) {
    user.password = await bcrypt.hash(user.password, 8);
  }
}
