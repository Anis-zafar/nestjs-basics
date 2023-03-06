import { Injectable } from '@nestjs/common';
// import { CreateUserType } from 'src/utlis/types';
import { My_Document, User } from 'src/users/users.models';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { HttpException } from '@nestjs/common/exceptions';
import { HttpStatus } from '@nestjs/common/enums';
import { CreateUserDTO } from 'src/users/dtos/CreateUser.dto';
@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private usermodel: Model<My_Document>) {}

  //create User
  async createUser(user: User): Promise<User> {
    const newUser = new this.usermodel(user);
    return newUser.save();
  }
  async getUsers(): Promise<User[]> {
    const users = await this.usermodel.find();
    return users;
  }
  async delUser(id: number) {
    const user = await this.usermodel.findOneAndDelete({ _id: id });
    // if (!user)
    //   throw new HttpException('User not Found', HttpStatus.BAD_REQUEST);
    // await user.deleteOne({ user });
    return user;
  }
  async updateUser(id: number, data: CreateUserDTO) {
    console.log(data);
    console.log(id);

    const user = await this.usermodel.findOneAndUpdate(
      { _id: id },
      { $set: { ...data } },
      { new: true },
    );

    if (!user) {
      throw new HttpException('User not Found', HttpStatus.BAD_REQUEST);
    }
    return user;
  }
}
