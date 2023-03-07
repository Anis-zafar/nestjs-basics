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
} from 'class-validator';
import { User } from '../users.models';

export class CreateUserDTO {
  @IsNotEmpty()
  username: string;
  @IsEmail()
  @IsNotEmpty()
  email: string;
  age: number;
  createdAt: Date;
  @IsNotEmpty()
  @IsString()
  @MinLength(4)
  @MaxLength(15)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'password too weak',
  })
  password: string;
}
