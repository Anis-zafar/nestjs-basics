import { Injectable } from '@nestjs/common';
// import { CreateUserType } from 'src/utlis/types';
import { My_Document, User } from 'src/users/users.models';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import {
  HttpException,
  // UnauthorizedException,
} from '@nestjs/common/exceptions';
import { HttpStatus } from '@nestjs/common/enums';
import { CreateUserDTO, loginDTO } from 'src/users/dtos/CreateUser.dto';
import * as bcrypt from 'bcrypt';
// import { JwtService } from '@nestjs/jwt';
import { sign } from 'jsonwebtoken';
import { imageFileFilter } from '../../../utlis/file-uploading.utlis';
import { MailerService } from '@nestjs-modules/mailer';
import express from 'express';
@Injectable()
export class UsersService {
  // async Validate(username: string, password: string): User {
  //   throw new Error('Method not implemented.');
  // }
  constructor(
    @InjectModel('User') private usermodel: Model<My_Document>,
    private readonly mailservice: MailerService,
  ) {}
  //create User
  async createUser(user: User): Promise<any> {
    const newUser = new this.usermodel(user);
    const data = await this.usermodel.findOne({ email: user.email });
    if (!data) {
      const hash = await bcrypt.hash(newUser.password, 10);
      newUser.password = hash;
      newUser.save();
      return { data: newUser, message: 'user created', error: null };
    } else {
      throw new HttpException('Email already exists', HttpStatus.BAD_REQUEST);
    }
  }
  async getUsers(): Promise<User[]> {
    const users = await this.usermodel.find();
    return users;
  }
  async delUser(id: string) {
    const user = await this.usermodel.findOneAndDelete({ _id: id });
    // if (!user)
    //   throw new HttpException('User not Found', HttpStatus.BAD_REQUEST);
    // await user.deleteOne({ user });
    return user;
  }
  async updateUser(id: string, data: CreateUserDTO) {
    // console.log(data);
    // console.log(id);

    if (data.password !== undefined) {
      const hash = await bcrypt.hash(data.password, 10);
      data.password = hash;
    }
    const temp = await this.usermodel.findOne({ email: data.email });
    if (!temp) {
      const user = await this.usermodel.findOneAndUpdate(
        { _id: id },
        { $set: { ...data } },
        { new: true },
      );

      if (!user) {
        throw new HttpException('User not Found', HttpStatus.BAD_REQUEST);
      }
      return user;
    } else {
      throw new HttpException('email already in use', HttpStatus.FORBIDDEN);
    }
  }
  //signup user
  async signup(user: User) {
    const newUser = new this.usermodel(user);
    const data = await this.usermodel.findOne({ email: user.email });
    if (!data) {
      const hash = await bcrypt.hash(newUser.password, 10);
      newUser.password = hash;
      newUser.save();
      await this.mailservice
        .sendMail({
          to: user.email,
          from: 'anis.zafar@ceative.co.uk',
          subject: 'Welcome to CEative',
          text: 'You are successfully Singed in for the Company Ceative',
        })
        .then(() => {
          console.log('mail sent');
        })
        .catch(() => {
          console.log('error');
        });

      return {
        data: newUser,
        message: 'User signedup successfully',
        error: null,
      };
    } else {
      throw new HttpException('Email already exists', HttpStatus.BAD_REQUEST);
    }
    // const token = await Jwt.sign(newUser, 'MYNAMEISKHAN');
  }
  //login user
  async login(user: loginDTO) {
    const data = await this.usermodel.findOne({ email: user.email });
    if (!data) {
      throw new HttpException('incorrect credentials', HttpStatus.BAD_REQUEST);
    }
    if (await bcrypt.compare(user.password, data.password)) {
      const Accesstoken = sign({ id: data.id }, 'secretkey', {
        expiresIn: '1d',
      });
      return {
        id: data.id,
        email: data.email,
        username: data.username,
        age: data.age,
        Auth_token: Accesstoken,
      };
    } else {
      throw new HttpException('incorrect credentials', HttpStatus.BAD_REQUEST);
    }
  }

  async updatemyself(req: { id: any }, user: CreateUserDTO) {
    if (user.password !== undefined) {
      const hash = await bcrypt.hash(user.password, 10);
      user.password = hash;
    }
    const temp = await this.usermodel.findOne({ email: user.email });
    if (!temp) {
      const user1 = await this.usermodel.findOneAndUpdate(
        { _id: req.id },
        { $set: { ...user } },
        { new: true },
      );

      if (!user1) {
        throw new HttpException('User not Found', HttpStatus.BAD_REQUEST);
      }
      return user1;
    } else {
      throw new HttpException('email already in use', HttpStatus.FORBIDDEN);
    }
  }
  async uploadFile(res, file: any) {
    // console.log(typeof file.path);

    return { file, message: new HttpException('file uploaded', HttpStatus.OK) };
  }
}
