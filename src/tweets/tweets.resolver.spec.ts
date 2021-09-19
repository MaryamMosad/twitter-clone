import { Test, TestingModule } from '@nestjs/testing';
import { TweetsResolver } from './tweets.resolver';
import { TweetsService } from './tweets.service';

describe('TweetsResolver', () => {
  let resolver: TweetsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TweetsResolver, TweetsService],
    }).compile();

    resolver = module.get<TweetsResolver>(TweetsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
