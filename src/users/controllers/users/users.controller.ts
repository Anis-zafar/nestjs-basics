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
  Put,
  Req,
  UseInterceptors,
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
import { request } from 'http';
import { FileInterceptor } from '@nestjs/platform-express/multer';
import { Res, UploadedFile } from '@nestjs/common/decorators';
import path, { extname } from 'path';
import { response } from 'express';
import { diskStorage } from 'multer';

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
  @Patch('update')
  async updatemyself(@Req() req: any, @Body() user: CreateUserDTO) {
    return this.Userservice.updatemyself(req.user, user);
  }

  @Post('upload')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './files',
        filename: (req, file, callBack) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          const filename = `${file.originalname}-${uniqueSuffix}${ext}`;
          callBack(null, filename);
        },
      }),
    }),
  )
  async upload(@UploadedFile() file, @Res() res) {
    return this.Userservice.uploadFile(res, file);
    // return this.Userservice.upload(file);
  }

  @Post('upload/:id')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './files',
        filename: (req, file, callBack) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          const filename = `${file.originalname}-${uniqueSuffix}${ext}`;
          callBack(null, filename);
        },
      }),
    }),
  )
  async updatepicture(@UploadedFile() file, @Param('id') id: string) {
    const filename = file.filename;
    await this.Userservice.updateimage(id, filename);
    return { filename };
  }
}
