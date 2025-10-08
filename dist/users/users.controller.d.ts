import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    signup(dto: CreateUserDto): Promise<Omit<import("./schemas/user.schema").User, "passwordHash">>;
    me(req: any): Promise<any>;
}
