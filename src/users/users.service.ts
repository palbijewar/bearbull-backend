import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private readonly userModel: Model<UserDocument>) {}

  async createUser(data: CreateUserDto): Promise<Omit<User, 'passwordHash'>> {
    const existing = await this.userModel.findOne({ email: data.email }).lean();
    if (existing) throw new ConflictException('Email already registered');

    if (!data.password) {
      throw new ConflictException('Password is required');
    }

    const passwordHash = await bcrypt.hash(data.password, 10);
    const created = await this.userModel.create({
      name: data.name,
      email: data.email,
      passwordHash,
    });
    const { passwordHash: _, ...safe } = created.toObject();
    return safe as any;
  }

  async findByEmail(email: string): Promise<UserDocument | null> {
    return this.userModel.findOne({ email });
  }

  async validateUser(email: string, password: string): Promise<UserDocument> {
    const user = await this.userModel.findOne({ email });
    if (!user) throw new NotFoundException('Invalid credentials');
    if (!user.passwordHash) throw new NotFoundException('Invalid credentials');
    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) throw new NotFoundException('Invalid credentials');
    return user;
  }
}



