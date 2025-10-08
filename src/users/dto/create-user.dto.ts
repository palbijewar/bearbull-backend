import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  name: string | undefined;

  @IsEmail()
  email: string | undefined;

  @MinLength(6)
  password: string | undefined;
}



