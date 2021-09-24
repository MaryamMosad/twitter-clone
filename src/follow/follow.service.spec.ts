import { getModelToken } from '@nestjs/sequelize';
import { Test, TestingModule } from '@nestjs/testing';
import { FollowService } from './follow.service';
import { User } from '../users/entities/user.entity';

const testUser = { userId:1 ,username: 'Test', email:'test@gmail.com', password: 'Russian Blue' };

describe('FollowService', () => {
  let service: FollowService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FollowService, {
        provide: getModelToken(User),
        useValue: {
          findAll: jest.fn(() => [testUser]),
          create: jest.fn(() => testUser),
        },
      },],
    }).compile();

    service = module.get<FollowService>(FollowService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
