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
import { CreateUserDTO, loginDTO } from '../../dtos/CreateUser.dto';
import { UsersService } from 'src/users/services/users/users.service';
import { User } from 'src/users/users.models';
import {
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
} from '@nestjs/swagger';

@Controller('users')
export class UsersController {
  constructor(private readonly Userservice: UsersService) {}

  @Post('create')
  @ApiBearerAuth()
  @ApiCreatedResponse({ description: 'user registered' })
  @UsePipes(new ValidationPipe())
  async createUser(@Body() userDto: CreateUserDTO) {
    return this.Userservice.createUser(userDto);
  }
  @Get()
  @ApiBearerAuth()
  async getUsers() {
    return this.Userservice.getUsers();
  }
  @Delete('delete/:id')
  @ApiBearerAuth()
  async deleteUser(@Param('id') id: string) {
    return this.Userservice.delUser(id);
  }
  @Patch('update/:id')
  @ApiBearerAuth()
  @ApiOkResponse({ description: 'User Updated' })
  @UsePipes(new ValidationPipe())
  async updateUser(@Param('id') id: string, @Body() data: CreateUserDTO) {
    return this.Userservice.updateUser(id, data);
  }
  @Post('signup')
  @ApiCreatedResponse({ description: 'user registered' })
  @UsePipes(new ValidationPipe())
  async Signup(@Body() data: CreateUserDTO) {
    return this.Userservice.signup(data);
  }
  @Post('login')
  @ApiCreatedResponse({ description: 'user logined' })
  @UsePipes(new ValidationPipe())
  async login(@Body() data: loginDTO) {
    const user = await this.Userservice.login(data);
    // console.log(user);
    return user;
  }
}
