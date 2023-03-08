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
  username: string;
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({ type: String, description: 'email' })
  email: string;
  @Min(18)
  @Max(100)
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


