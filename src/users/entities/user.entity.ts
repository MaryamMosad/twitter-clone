import { ObjectType, Field, Int } from '@nestjs/graphql';
import { IsEmail, IsString } from 'class-validator';
import { Model } from 'sequelize';
import { Column, Table } from 'sequelize-typescript';

@Table
@ObjectType()
export class User extends Model{
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

  /*@Column
  @Field()
  tweetsId:string;

  @Column
  @Field((type) =>User[])
  followers:[User];

  @Column
  @Field()
  following:[User];*/
}
