import { CreateFollowRelaionshipInput } from './create-follow-relaionship.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateFollowRelaionshipInput extends PartialType(CreateFollowRelaionshipInput) {
  @Field(() => Int)
  id: number;
}
