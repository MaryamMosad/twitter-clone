import { Test, TestingModule } from '@nestjs/testing';
import { FollowRelaionshipsService } from './follow-relaionships.service';

describe('FollowRelaionshipsService', () => {
  let service: FollowRelaionshipsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FollowRelaionshipsService],
    }).compile();

    service = module.get<FollowRelaionshipsService>(FollowRelaionshipsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
