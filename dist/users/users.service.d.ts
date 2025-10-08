import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
export declare class UsersService {
    private readonly userModel;
    constructor(userModel: Model<UserDocument>);
    createUser(data: CreateUserDto): Promise<Omit<User, 'passwordHash'>>;
    findByEmail(email: string): Promise<UserDocument | null>;
    validateUser(email: string, password: string): Promise<UserDocument>;
}
