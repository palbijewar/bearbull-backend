import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { LoginDto } from '../users/dto/login.dto';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService, private readonly jwtService: JwtService) {}

  async login(dto: LoginDto) {
    if (!dto.email || !dto.password) {
      throw new Error('Email and password are required');
    }
    const user = await this.usersService.validateUser(dto.email, dto.password);
    if (!user || !user._id || !user.email || !user.name) {
      throw new Error('Invalid user credentials');
    }
    const payload = { sub: user._id.toString(), email: user.email, name: user.name };
    const accessToken = await this.jwtService.signAsync(payload);
    return { accessToken };
  }
}



