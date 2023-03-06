import { Injectable } from '@nestjs/common';
import { CreateUserType } from 'src/utlis/types';

@Injectable()
export class UsersService {
  private fakeUsers = [
    { username: 'anis', email: 'anis.zafar@ceative.co.uk' },
    { username: 'ali', email: 'ali.zafar@ceative.co.uk' },
  ];

  fetchUsers() {
    return this.fakeUsers;
  }
  createUser(userdetails: CreateUserType) {
    this.fakeUsers.push(userdetails);
    return;
  }
  fetchUserById(user_id: number) {
    return null;
  }
}
