import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateFollowInput {
  @Field(() => Int)
  followingId: number;
}
