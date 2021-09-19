import { CreateTweetInput } from './create-tweet.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateTweetInput extends PartialType(CreateTweetInput) {
  @Field(() => Int)
  id: number;
}
