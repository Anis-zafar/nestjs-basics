import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsEmail,
  IsStrongPassword,
  IsString,
  minLength,
  MaxLength,
  MinLength,
  Matches,
  Validate,
  IsEmpty,
  MIN,
  Min,
  Max,
} from 'class-validator';
import { User } from '../users.models';

export class CreateUserDTO {
  @IsNotEmpty()
  @ApiProperty({ type: String, description: 'username' })
  username: string;
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({ type: String, description: 'email' })
  email: string;
  @Min(18)
  @Max(100)
  @ApiProperty({ type: Number, description: 'age' })
  age: number;
  createdAt: Date;
  @IsNotEmpty()
  @IsString()
  @MinLength(4)
  @MaxLength(15)
  @ApiProperty({ type: String, description: 'password' })
  // @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
  //   message: 'password too weak',
  // })
  password: string;
  image: string;
}

export class loginDTO {
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({ type: String, description: 'email' })
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(4)
  @MaxLength(15)
  @ApiProperty({ type: String, description: 'password' })
  // @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
  //   message: 'password too weak',
  // })
  password: string;
}

export class UsersResponseDto {
  @ApiProperty({
    example: [
      {
        _id: '6407428302d2114eb945a8a4',
        username: 'Anis Zafar',
        password:
          '$2b$10$iNOhDNXP0hHWRxlflh9uQ./MeObl4GSikasPkdBW1aBiL8G5UpoGS',
        email: 'anis.zafar@ceative.co.uk',
        age: 24,
        createdAt: '2023-03-07T13:56:19.807Z',
        __v: 0,
      },
      {
        _id: '6407428302d2114eb945a8a4',
        username: 'Anis Zafar',
        password:
          '$2b$10$iNOhDNXP0hHWRxlflh9uQ./MeObl4GSikasPkdBW1aBiL8G5UpoGS',
        email: 'anis.zafar@ceative.co.uk',
        age: 24,
        createdAt: '2023-03-07T13:56:19.807Z',
        __v: 0,
      },
      {
        _id: '6407428302d2114eb945a8a4',
        username: 'Anis Zafar',
        password:
          '$2b$10$iNOhDNXP0hHWRxlflh9uQ./MeObl4GSikasPkdBW1aBiL8G5UpoGS',
        email: 'anis.zafar@ceative.co.uk',
        age: 24,
        createdAt: '2023-03-07T13:56:19.807Z',
        __v: 0,
      },
      {
        _id: '6407428302d2114eb945a8a4',
        username: 'Anis Zafar',
        password:
          '$2b$10$iNOhDNXP0hHWRxlflh9uQ./MeObl4GSikasPkdBW1aBiL8G5UpoGS',
        email: 'anis.zafar@ceative.co.uk',
        age: 24,
        createdAt: '2023-03-07T13:56:19.807Z',
        __v: 0,
      },
      {
        _id: '6407429302d2114eb945a8a7',
        username: 'Ali Zafar',
        password:
          '$2b$10$MQL5ZkM9K86L9nCfhsFUHOuk5VbO3uq0DMW61mZvE79dXo2oRW5oC',
        email: 'ali.zafar@ceative.co.uk',
        age: 24,
        createdAt: '2023-03-07T13:56:35.144Z',
        __v: 0,
      },
      {
        _id: '640742a402d2114eb945a8aa',
        username: 'Ali Hamza',
        password:
          '$2b$10$wVgEVyRJVXMUkpghhHgFmujTE5X7c1ALkr8oitsHXS3Qi3IZbe8Rq',
        email: 'ali.hamza@ceative.co.uk',
        age: 24,
        createdAt: '2023-03-07T13:56:52.459Z',
        __v: 0,
      },
    ],
  })
  data: any;
}
