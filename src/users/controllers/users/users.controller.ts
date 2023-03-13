import {
  Delete,
  Patch,
  Body,
  Controller,
  Get,
  Post,
  Param,
  UsePipes,
  ValidationPipe,
  // ParseIntPipe,
  // HttpException,
  // HttpStatus,
  // Put,
  // HttpCode,
  // ParseBoolPipe,
} from '@nestjs/common';
// import { UseGuards } from '@nestjs/common/decorators';
// import { JwtService } from '@nestjs/jwt';
// import { AuthGuard } from '@nestjs/passport';
// import { AuthService } from 'src/auth/auth.service';
// import { Query } from 'mongoose';
// import { Request, Response } from 'express';
import { CreateUserDTO, loginDTO, Users } from '../../dtos/CreateUser.dto';
import { UsersService } from 'src/users/services/users/users.service';
// import { User } from 'src/users/users.models';
import {
  ApiBearerAuth,
  ApiBody,
  // ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('User')
@Controller('users')
export class UsersController {
  constructor(private readonly Userservice: UsersService) {}
  @Post('signup')
  @ApiCreatedResponse({ description: 'user registered' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        username: {
          type: 'string',
          example: 'Test',
        },
        email: {
          type: 'string',
          example: 'test123@abc.xyz',
        },
        password: {
          type: 'string',
          example: '1234',
        },
        age: {
          type: 'integer',
          example: 23,
        },
      },
    },
  })
  @UsePipes(new ValidationPipe())
  async Signup(@Body() data: CreateUserDTO) {
    return this.Userservice.signup(data);
  }

  @Post('login')
  @ApiCreatedResponse({ description: 'user logined' })
  @ApiBody({
    schema: {
      properties: {
        email: {
          type: 'string',
          example: 'test123@abc.xyz',
        },
        password: {
          type: 'string',
          example: '1234',
        },
      },
    },
  })
  @UsePipes(new ValidationPipe())
  async login(@Body() data: loginDTO) {
    const user = await this.Userservice.login(data);
    // console.log(user);
    return user;
  }
  @Post('create')
  @ApiBearerAuth()
  @ApiCreatedResponse({ description: 'user registered' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        username: {
          type: 'string',
          example: 'Test',
        },
        email: {
          type: 'string',
          example: 'test123@abc.xyz',
        },
        password: {
          type: 'string',
          example: '1234',
        },
        age: {
          type: 'integer',
          example: 23,
        },
      },
    },
  })
  @UsePipes(new ValidationPipe())
  async createUser(@Body() userDto: CreateUserDTO) {
    return this.Userservice.createUser(userDto);
  }
  @Get()
  @ApiBearerAuth()
  @ApiResponse({
    description: 'get all users',
    schema: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
            example: '640f03e2b997b81c37a48f9e',
          },
          username: {
            type: 'string',
            example: 'Test',
          },
          email: {
            type: 'string',
            example: 'test123@abc.xyz',
          },
          password: {
            type: 'string',
            example:
              '$2b$10$M/m5UDNyW7BU3zce/wAMYeOiIoNWpI5Lmw4lBjPgl4fZH64E.95JG',
          },
          age: {
            type: 'integer',
            example: 23,
          },
        },
      },
    },
  })
  async getUsers() {
    return this.Userservice.getUsers();
  }
  @Delete('delete/:id')
  @ApiBearerAuth()
  @ApiCreatedResponse({ description: 'user deleted' })
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
}
