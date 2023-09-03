import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { hashSync } from "bcrypt";
import { FindManyOptions, FindOneOptions, Repository } from "typeorm";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { User } from "./entities/user.entity";
import { UserNameNotAllowedException } from "./exceptions/userNameNotAllowed.exception";
import { UserNotFoundException } from "./exceptions/userNotFound.exception";
import { UserPayloadInterface } from "./interfaces/user.payload.interface";

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>
    ) {}
    async create(createUserDto: CreateUserDto) {
        await this.checkUserWithSameUserName(createUserDto.user_name);
        createUserDto.password = hashSync(createUserDto.password, 12);
        const user = this.usersRepository.create(createUserDto);
        await this.usersRepository.save(user);
        return user;
    }

    findAll(options: FindManyOptions<User>) {
        return this.usersRepository.find(options);
    }

    async findOne(
        options: FindOneOptions<User>,
        delete_password = true
    ): Promise<User> {
        const requiredUser = await this.usersRepository.findOne(options);
        if (requiredUser && delete_password) delete requiredUser.password;
        return requiredUser;
    }

    async update(user: User, updateUserDto: UpdateUserDto) {
        this.usersRepository.save({ ...user, ...updateUserDto });
        return { message: "user has been updated succsesfully" };
    }

    // async putAvatar(user_id: number, avatar: Express.Multer.File) {
    //     const user = await this.findOne({ where: { user_id } });
    //     user.avatar = avatar ? avatar.path : "";
    //     this.usersRepository.save(user);
    //     return { message: "avatar has been upload" };
    // }

    async remove(user: User) {
        if (!user) throw new UserNotFoundException();
        this.usersRepository.softRemove(user);
        return { message: "user has been removed succsesfully" };
    }

    // async restore(user: User) {
    //     if (!user) throw new UserNotFoundException();
    //     await this.usersRepository.recover(user);
    //     return { message: "user has been restored succsesfully" };
    // }

    userIsAdmin(user: User | UserPayloadInterface): boolean {
        return user.is_admin;
    }

    async checkUserWithSameUserName(user_name: string) {
        const userWithSameUserName: User = await this.findOne({
            where: { user_name },
            withDeleted: true,
        });
        if (userWithSameUserName) throw new UserNameNotAllowedException();
    }
}
