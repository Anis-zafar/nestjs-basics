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
import {
  CreateUserDTO,
  loginDTO,
  UsersResponseDto,
} from '../../dtos/CreateUser.dto';
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
  @ApiCreatedResponse({
    description: 'user registered',
    schema: {
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
          example: '1234',
        },
        age: {
          type: 'integer',
          example: 23,
        },
      },
    },
  })
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
  @ApiCreatedResponse({
    description: 'User Successfully logined',
    schema: {
      properties: {
        id: {
          type: 'string',
          example: '640f03e2b997b81c37a48f9e',
        },
        email: {
          type: 'string',
          example: 'test123@abc.xyz',
        },
        username: {
          type: 'string',
          example: 'Test',
        },
        Auth_token: {
          type: 'string',
          example:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MGYwM2UyYjk5N2I4MWMzN2E0OGY5ZSIsImlhdCI6MTY3ODcxMDgzOSwiZXhwIjoxNjc4Nzk3MjM5fQ.wJ2qMYnxmsy9YiPZfLgkApqIv0WXAytGOm9fagVgR',
        },
      },
    },
  })
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
  @ApiCreatedResponse({
    description: 'user registered',
    schema: {
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
          example: '1234',
        },
        age: {
          type: 'integer',
          example: 23,
        },
      },
    },
  })
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
  @ApiResponse({ type: UsersResponseDto })
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
  @ApiResponse({
    description: 'User Updated',
    schema: {
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
  })
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
          example: '124342',
        },
        age: {
          type: 'integer',
          example: 23,
        },
      },
    },
  })
  @UsePipes(new ValidationPipe())
  async updateUser(@Param('id') id: string, @Body() data: CreateUserDTO) {
    return this.Userservice.updateUser(id, data);
  }
}
