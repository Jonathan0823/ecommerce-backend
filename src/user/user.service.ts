import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';
import { hash } from 'bcrypt';
@Injectable()
export class UserService {
    constructor(private prisma: PrismaService){}

    async create(dto:CreateUserDto){
        const user = await this.prisma.user.findUnique({
            where: {
                email: dto.email
            }
        })
        if(user){
            throw new ConflictException('Email is already exists');
        }

        const newUser = await this.prisma.user.create({
            data: {
                ...dto,
                password: await hash(dto.password, 10),
            }
        })

        const {password, ...result} = newUser;
        return result;
    }

    async updateUserProfile(id: string, updateUserDto: UpdateUserDto) {
        if (!updateUserDto) {
            throw new Error('No data provided for update');
        }

        const hashedPassword = updateUserDto.password ? await hash(updateUserDto.password, 10) : undefined;

        return this.prisma.user.update({
            where: { id },
            data: {
                ...updateUserDto,
                password: hashedPassword || undefined,
                address: updateUserDto.address ? JSON.stringify(updateUserDto.address) : undefined,
            },
        });
    }

    async findbyEmail(email: string){
        return await this.prisma.user.findUnique({
            where: {
                email: email
            }
        })
    }

    async findbyId(id: string){
        return await this.prisma.user.findUnique({
            where: {
                id: id
            }
        })
    }
}
