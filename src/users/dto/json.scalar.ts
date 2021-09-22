import graphqlTypeJson from 'graphql-type-json'
import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class JSONTYPE {
  @Field(() => graphqlTypeJson, { nullable: true })
  json?: object
}