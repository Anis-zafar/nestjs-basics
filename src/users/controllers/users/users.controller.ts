import {
  Delete,
  Patch,
  Body,
  Controller,
  Get,
  Post,
  Param,
  Query,
  UsePipes,
  ValidationPipe,
  ParseIntPipe,
  HttpException,
  HttpStatus,
  Put,
  HttpCode,
  // ParseBoolPipe,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from 'src/auth/auth.service';
// import { Query } from 'mongoose';
// import { Request, Response } from 'express';
import { CreateUserDTO } from 'src/users/dtos/CreateUser.dto';
import { UsersService } from 'src/users/services/users/users.service';
import { User } from 'src/users/users.models';

@Controller('users')
export class UsersController {
  constructor(private readonly Userservice: UsersService) {}

  @Post('create')
  @HttpCode(HttpStatus.CREATED)
  async createUser(@Body() userDto: User) {
    return this.Userservice.createUser(userDto);
  }
  @Get()
  async getUsers() {
    return this.Userservice.getUsers();
  }
  @Delete('delete/:id')
  async deleteUser(@Param('id') id: number) {
    return this.Userservice.delUser(id);
  }
  @Put('update/:id')
  async updateUser(@Param('id') id: number, @Body() data: CreateUserDTO) {
    return this.Userservice.updateUser(id, data);
  }
  @Post('signup')
  async Signup(@Body() data: CreateUserDTO) {
    return this.Userservice.signup(data);
  }
  @Post('login')
  async login(@Body() data: CreateUserDTO) {
    return this.Userservice.login(data);
  }
}
