import { Module } from '@nestjs/common';
import { FollowRelaionshipsService } from './follow-relaionships.service';
import { FollowRelaionshipsResolver } from './follow-relaionships.resolver';

@Module({
  providers: [FollowRelaionshipsResolver, FollowRelaionshipsService]
})
export class FollowRelaionshipsModule {}
