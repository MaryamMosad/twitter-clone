import { getModelToken } from '@nestjs/sequelize';
import { Test, TestingModule } from '@nestjs/testing';
import { Tweet } from '../tweets/entities/tweet.entity';
import { User } from '../users/entities/user.entity';
import { FollowService } from './follow.service';


describe('FollowService', () => {
  let service: FollowService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FollowService, {
        provide: getModelToken(User),
        useValue:{}
      },{
        provide: getModelToken(Tweet),
        useValue:{}
      }],
    }).compile();
    
    service = module.get<FollowService>(FollowService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
