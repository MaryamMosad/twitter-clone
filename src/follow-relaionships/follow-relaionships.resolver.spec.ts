import { Test, TestingModule } from '@nestjs/testing';
import { FollowRelaionshipsResolver } from './follow-relaionships.resolver';
import { FollowRelaionshipsService } from './follow-relaionships.service';

describe('FollowRelaionshipsResolver', () => {
  let resolver: FollowRelaionshipsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FollowRelaionshipsResolver, FollowRelaionshipsService],
    }).compile();

    resolver = module.get<FollowRelaionshipsResolver>(FollowRelaionshipsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
