import { InputType, Int, Field } from '@nestjs/graphql';
import { IsString, IsEmail } from 'class-validator';
import { Column } from 'sequelize-typescript';

@InputType()
export class CreateUserInput {
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
}
