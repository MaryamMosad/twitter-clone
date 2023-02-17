import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateTweetInput {
  @Field()
  text: string;

}