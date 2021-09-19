import { Injectable } from '@nestjs/common';
import { CreateFollowRelaionshipInput } from './dto/create-follow-relaionship.input';
import { UpdateFollowRelaionshipInput } from './dto/update-follow-relaionship.input';

@Injectable()
export class FollowRelaionshipsService {
  create(createFollowRelaionshipInput: CreateFollowRelaionshipInput) {
    return 'This action adds a new followRelaionship';
  }

  findAll() {
    return `This action returns all followRelaionships`;
  }

  findOne(id: number) {
    return `This action returns a #${id} followRelaionship`;
  }

  update(id: number, updateFollowRelaionshipInput: UpdateFollowRelaionshipInput) {
    return `This action updates a #${id} followRelaionship`;
  }

  remove(id: number) {
    return `This action removes a #${id} followRelaionship`;
  }
}
