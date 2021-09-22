import { ForbiddenException, GoneException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { create } from 'domain';
import { STATUS_CODES } from 'http';
import { CreateFollowInput } from './dto/create-follow.input';
import { UpdateFollowInput } from './dto/update-follow.input';
import { Follow } from './entities/follow.entity';

@Injectable()
export class FollowService {
  constructor(
    @InjectModel(Follow)
    private followModel: typeof Follow,
  ) { }

  async create(createFollowInput: CreateFollowInput) {
    const followStatus = await this.followModel.findOne({ where: { followerId: createFollowInput.followerId, followingId: createFollowInput.followingId } });
    if (followStatus){
      throw new ForbiddenException;    
    }
    else{
      return await this.followModel.create(createFollowInput);
    }
  }
  async remove(id: number) {
    const follow=await this.followModel.findOne({where:{followId:id}})
    if(!follow){
      throw new NotFoundException;
    }
    else
    return this.followModel.destroy({where:{followId:id}})
    
  }
  findAll() {
    return this.followModel.findAll();
  }

  findOne(id: number) {
    return `This action returns a #${id} follow`;
  }

  
}
