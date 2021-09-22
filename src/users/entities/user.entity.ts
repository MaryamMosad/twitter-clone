import { ObjectType, Field, Int } from '@nestjs/graphql';
import { IsEmail, IsString } from 'class-validator';
import { Model, AutoIncrement, Column, DataType, HasMany, Table, BeforeCreate, BelongsToMany } from 'sequelize-typescript';
import { Tweet } from 'src/tweets/entities/tweet.entity';
import * as bcrypt from 'bcryptjs'
import { Follow } from 'src/follow/entities/follow.entity';


@Table
@ObjectType()
export class User extends Model {
  @AutoIncrement
  @Column({
    primaryKey: true,
    type: DataType.INTEGER,
  })
  @Field(() => Int)
  userId: number;

  @IsString()
  @Column({ unique: true })
  username: string;

  @IsEmail()
  @Column({ unique: true })
  email: string;

  @Column
  password: string;

  @Column
  passwordConfirm: string;

  
  @HasMany(() => Tweet)
  @Field(() => [Tweet], { nullable: true })
  tweets?: Tweet[];

  @BelongsToMany(() => User, () => Follow, 'followingId')
  followers?: User[];

  @BelongsToMany(() => User, () => Follow, 'followerId')
  followings?: User[];

  @Column
  token?: string;


  @BeforeCreate
  public static async hashPassword(user: User) {
    user.password = await bcrypt.hash(user.password, 8);
    user.passwordConfirm = '';
  }
  async validatePassword(password: String): Promise<Boolean> {
    const isCorrect = await bcrypt.compare(password, this.password)
    return isCorrect;

  }

}
