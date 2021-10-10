import { GoneException,Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from '../users/entities/user.entity';
import { Follow } from './entities/follow.entity';

@Injectable()
export class FollowService {
  constructor(
    @InjectModel(Follow)
    private followModel: typeof Follow,
    @InjectModel(User)
    private userModel: typeof User,
  ) { }

  //create new follow entry if it doesn't exist and delete if it exists
  async create(createFollowInput) {
    const followStatus = await this.followModel.findOne({ where: { followerId:createFollowInput.followerId, followingId:createFollowInput.followingId } });
    if (followStatus){
      await this.followModel.destroy({where:{followId:followStatus.followId}})
      throw new GoneException;
        }
    else{
      return await this.followModel.create(createFollowInput);
    }
  }
  async findUserFollowers(id: number): Promise<Follow[]> {
    //const { limit, offset } = args;
    return this.followModel.findAll({ where: { followingId: id }
    ,//limit:limit,offset:offset
  })
  }
  
//retuens userIds for followed people
  async findUserFollowings(id: number): Promise<Follow[]> {
    //const { limit, offset } = args;
    return this.followModel.findAll({ where: { followerId: id }
      //limit:limit,offset:offset
    })
  }
}