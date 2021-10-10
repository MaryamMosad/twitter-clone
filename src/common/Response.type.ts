import { ObjectType, Field, Int } from "@nestjs/graphql"
import { User } from "../users/entities/user.entity"

@ObjectType({isAbstract:true})
export class GqlUserResponse {
  @Field(type => User,{nullable:true})
  data?: User
  
  @Field(type => [User],{nullable:true})
  dataArray?: User[]

  @Field(type=>Int)
  total:number 

  @Field(type=>Int)
  statusCode:number;

  @Field()
  message:string
}