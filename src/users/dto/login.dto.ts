import { IsEmail, MinLength } from 'class-validator';

export class LoginDto {
  @IsEmail()
  email: string | undefined;

  @MinLength(6)
  password: string | undefined;
}



