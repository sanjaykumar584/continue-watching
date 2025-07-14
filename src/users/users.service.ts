import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  private readonly users = [
    { userId: 1, username: 'user001', password: 'sanjay' },
    { userId: 2, username: 'user002', password: 'sanjay' },
  ];

  async findOne(username: string) {
    return this.users.find(user => user.username === username);
  }
}
