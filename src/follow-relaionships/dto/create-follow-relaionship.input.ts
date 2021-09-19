import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateFollowRelaionshipInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
