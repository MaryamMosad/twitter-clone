import { ObjectType, Field, Int } from '@nestjs/graphql';
import { IsEmail, IsString } from 'class-validator';
import { Model,AutoIncrement, Column, DataType, HasMany, Table, BeforeCreate } from 'sequelize-typescript';
import { Tweet } from 'src/tweets/entities/tweet.entity';
import * as bcrypt from 'bcryptjs'
import { Optional } from '@nestjs/common';


@Table
@ObjectType()
export class User extends Model{
  @AutoIncrement
  @Column({
    primaryKey: true,
    type:DataType.INTEGER,
  })
  @Field(() => Int)
  userId: number;

  @IsString()
  @Column({unique:true})
  @Field()
  username:string;

  @IsEmail()
  @Column({unique:true})
  @Field()
  email:string;

  @Column
  @Field()
  password:string;

  @Column
  @Field()
  passwordConfirm:string;


  @HasMany(()=> Tweet)
  @Field(()=> [Tweet] , {nullable:true})
  tweets?:Tweet[];


  @BeforeCreate
  public static async hashPassword(user:User) {
    user.password = await bcrypt.hash(user.password, 8);
    user.passwordConfirm='';
  }
  async validatePassword(password: String): Promise<Boolean> {
    const isCorrect=await bcrypt.compare(password, this.password)
    return isCorrect;
  
}
/*
  @Column
  @Field((type) =>User[])
  followers:[User];

  @Column
  @Field()
  following:[User];*/
}
