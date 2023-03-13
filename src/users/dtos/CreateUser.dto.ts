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

export class Users {
  @ApiProperty({
    type: String,
    example: '640f03e2b997b81c37a48f9e',
  })
  id: any;
  @ApiProperty({
    type: String,
    example: 'test',
  })
  username: any;
  @ApiProperty({
    type: String,
    example: 'test@test.com',
  })
  email: any;
  @ApiProperty({
    type: String,
    example: '$2b$10$M/m5UDNyW7BU3zce/wAMYeOiIoNWpI5Lmw4lBjPgl4fZH64E.95JG',
  })
  'password': '1234';
  @ApiProperty({
    type: String,
    example: '23',
  })
  age: any;
}
