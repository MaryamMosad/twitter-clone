import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateFollowInput } from './dto/create-follow.input';
import { Follow } from './entities/follow.entity';

@Injectable()
export class FollowService {
  constructor(@InjectModel(Follow) private followModel: typeof Follow) {}

  async followUnfollow(createFollowInput: CreateFollowInput, userId: number) {
    const followStatus = await this.followModel.findOne({
      where: {
        followerId: userId,
        followingId: createFollowInput.followingId,
      },
    });
    if (followStatus) {
      return !!(await this.followModel.destroy({
        where: { followId: followStatus.followId },
      }));
    } else {
      return !!(await this.followModel.create({
        followerId: userId,
        ...createFollowInput,
      }));
    }
  }

  //TODO get followers and following list
}
