import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateTweetInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
