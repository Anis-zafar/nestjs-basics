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
import { UseGuards } from '@nestjs/common/decorators';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';
// import { AuthService } from 'src/auth/auth.service';
// import { Query } from 'mongoose';
// import { Request, Response } from 'express';
import { CreateUserDTO } from '../../dtos/CreateUser.dto';
import { UsersService } from 'src/users/services/users/users.service';
import { User } from 'src/users/users.models';
import { ApiBody, ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';

@Controller('users')
export class UsersController {
  constructor(private readonly Userservice: UsersService) {}

  @Post('create')
  @ApiCreatedResponse({ description: 'user registered' })
  @UsePipes(new ValidationPipe())
  async createUser(@Body() userDto: CreateUserDTO) {
    return this.Userservice.createUser(userDto);
  }
  @Get()
  async getUsers() {
    return this.Userservice.getUsers();
  }
  @Delete('delete/:id')
  async deleteUser(@Param('id') id: string) {
    return this.Userservice.delUser(id);
  }
  @Patch('update/:id')
  @ApiOkResponse({ description: 'User Updated' })
  @UsePipes(new ValidationPipe())
  async updateUser(@Param('id') id: string, @Body() data: CreateUserDTO) {
    return this.Userservice.updateUser(id, data);
  }
  @Post('signup')
  @UsePipes(new ValidationPipe())
  async Signup(@Body() data: CreateUserDTO) {
    return this.Userservice.signup(data);
  }
  @Post('login')
  // @UseGuards(AuthGuard('local'))
  @UsePipes(new ValidationPipe())
  async login(@Body() data: CreateUserDTO) {
    const user = await this.Userservice.login(data);
    // console.log(user);
    return user;
  }
}
