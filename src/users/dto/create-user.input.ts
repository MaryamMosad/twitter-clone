import { InputType, Int, Field } from '@nestjs/graphql';
import { IsString, IsEmail } from 'class-validator';
import { Column } from 'sequelize-typescript';

@InputType()
export class CreateUserInput {
  @Column({primaryKey: true,autoIncrement:true})
  @Field(() => Int, { description: 'Example field (placeholder)' })
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
}
