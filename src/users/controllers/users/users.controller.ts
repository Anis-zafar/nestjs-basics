import {
  Body,
  Controller,
  Get,
  Post,
  Param,
  // Query,
  UsePipes,
  ValidationPipe,
  ParseIntPipe,
  // ParseBoolPipe,
} from '@nestjs/common';
// import { Query } from 'mongoose';
// import { Request, Response } from 'express';
import { CreateUserDTO } from 'src/users/dtos/CreateUser.dto';
import { UsersService } from 'src/users/services/users/users.service';

@Controller('users')
export class UsersController {
  constructor(private Userservice: UsersService) {}
  @Get()
  getusers() {
    return this.Userservice.fetchUsers();
  }
  @Get('posts')
  getuserposts() {
    return [
      {
        username: 'anis',
        email: 'anis.zafar@ceative.com',
        no_ofposts: [
          {
            id: 1,
            postname: 'linkedin',
            description: 'looking for a job',
          },
          {
            id: 2,
            postname: 'linkedin',
            description: 'looking for a nodejs job',
          },
        ],
      },
    ];
  }
  @Get('posts/comments')
  getcomments() {
    return [
      {
        id: 1,
        title: 'linkedin',
        Comments: [
          {
            comment: 'i have a job ',
          },
        ],
      },
    ];
  }
  @Post('create')
  @UsePipes(new ValidationPipe())
  createuser(@Body() userdata: CreateUserDTO) {
    console.log(userdata);
    return this.Userservice.createUser(userdata);
  }
  @Get(':id')
  getuserbyid(@Param('id', ParseIntPipe) id: number) {
    const user = this.Userservice.fetchUserById(id);
    if (!user) {
      return;
    } else {
      return { user: 'amos' };
    }
  }
}
